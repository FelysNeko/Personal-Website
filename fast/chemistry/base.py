from __future__ import annotations
from typing import Union
from typing import Tuple
from typing import Dict
from typing import List
from typing import Set
from copy import deepcopy
import re
import os



def lookup(molecule: str) -> Atom:
    if molecule in Table.periodic:
        return deepcopy(Table.periodic[molecule])
    else:
        raise Exception('atom not found')


def parse(molecule:str) -> Tuple[int, List[Atom]]:
    poly = re.findall(r'\((.+?)\)(\d*)', molecule)
    molecule = re.sub(r'\((.+?)\)(\d*)', '', molecule)
    atom = re.findall(r'([A-Z][a-z]{0,1})(\d*)', molecule)
    coef = re.findall(r'(^\d*)', molecule)
    
    cvt = lambda x: 1 if x=='' else int(x)
    def shrink(symbol: str, coef: int) -> Atom:
        atom = lookup(symbol)
        atom.quantity = cvt(coef)
        return atom
    
    data = [shrink(i[0], i[1]) for i in atom+poly if i[0] in Table.periodic]
    coef = cvt(coef[0]) if len(data) else 0
    return coef, data



class Charge:
    def __init__(self, data: List[int]) -> None:
        self.__data: List[int] = [int(i) for i in data]

    def __eq__(self, __value: Charge) -> bool:
        return not sum([self.__data[i]-__value.__data[i] for i in range(3)])
    
    @property
    def ls(self) -> List:
        return [i for i in self.__data if i]

    @property
    def head(self) -> int:
        return self.__data[0]
    

    def match(self, charge: int) -> int:
        for i, each in enumerate(self.__data):
            if each+charge == 0:
                self.__data[0], self.__data[i] = self.__data[i], self.__data[0]
                return self.head
        else:
            return 0



class Atom:
    def __init__(self, data: List[Union[str, int, float]]) -> None:
        self.quantity: int = 0
        self.symbol: str = data[0]
        self.number: int = int(data[1])
        self.mass: float = float(data[2])
        self.charge: Charge = Charge(data[3:6])
        self.structure: str|None = None if data[6]=='0' else data[6]

    def __eq__(self, __value: Atom) -> bool:
        return (
            self.quantity == __value.quantity and
            self.symbol == __value.symbol and
            self.number == __value.number and
            self.mass == __value.mass and
            self.charge == __value.charge and
            self.structure == __value.structure
        )
    
    def __str__(self) -> str:
        symbol = f'({self.symbol})' if self.ispoly() else self.symbol
        quantity = str(self.quantity) if self.quantity>=2 else ''
        return symbol + quantity


    @property
    def count(self) -> Dict[str, int]:
        counter: Dict[str, int] = dict()
        if self.ispoly():
            for each in parse(self.symbol)[1]:
                counter[each.symbol] = each.quantity * self.quantity
        else:
            counter[self.symbol] = self.quantity
        return counter


    def ispoly(self) -> bool:
        return self.structure is None
    


class Rule:
    def __init__(self, data: List[str]) -> None:
        if data[0] == 'anion':
            self.__negative = Table.anion
        else:
            self.__negative = set(data[0].split(','))

        if '~' in data[1]:
            temp = data[1][1:].split(',')
            self.__positive = {i for i in Table.cation if i not in temp}
        elif data[1] == 'cation':
            self.__positive = Table.cation
        else:
            self.__positive = set(data[1].split(','))


    def match(self, a: str, b: str) -> bool:
        return (
            (a in self.__positive and b in self.__negative) or
            (b in self.__positive and a in self.__negative)
        )



class Path:
    current = os.path.dirname(os.path.abspath(__file__))
    periodic = os.path.join(current, 'data', 'periodic.csv')
    others = os.path.join(current, 'data', 'others.txt')
    solubility = os.path.join(current, 'data', 'solubility.txt')



class Table:
    periodic: Dict[str, Atom] = dict()
    activity: List[str] = list()
    diatomic: Set[str] = set()
    cation: Set[str] = set()
    anion: Set[str] = set()
    solubility: Set[Rule] = set()


    @classmethod
    def initialize(cls) -> None:
        with open(Path.periodic) as file:
            for each in file:
                line = each.strip('\n').split(',')
                cls.periodic[line[0]] = Atom(line)

        cls.cation = {key for key, value in cls.periodic.items() if value.charge.head>0}
        cls.anion = {key for key, value in cls.periodic.items() if value.charge.head<0}

        with open(Path.solubility) as file:
            for each in file:
                line = each.strip('\n').split(':')
                cls.solubility.add(Rule(line))

        with open(Path.others) as file:
            cls.activity = file.readline().strip('\n').split(',')
            cls.diatomic = set(file.readline().strip('\n').split(','))
