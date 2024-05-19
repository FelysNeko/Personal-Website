from __future__ import annotations
from typing import Dict
from typing import List
from typing import Tuple
from copy import deepcopy
import sympy as sp

from fast.chemistry.base import Table
from fast.chemistry.base import parse


class Molecule:
    def __init__(self, molecule: str, flag: bool = True) -> None:
        coef, data = parse(molecule)
        if not len(data):
            raise Exception('does not detect valid molecule')
        self.coef = coef
        self.data = data
        if flag: self.rectify(True)

    def __eq__(self, __value: Molecule) -> bool:
        return (
            self.coef == __value.coef and
            self.data == __value.data
        )
    
    def __str__(self) -> str:
        molecule = ''.join([str(i) for i in self.data])
        coef = '' if self.coef==1 else str(self.coef)
        return coef + molecule


    @property
    def mass(self) -> float:
        return round(self.coef * sum([i.mass * i.quantity for i in self.data]), 4)
    
    @property
    def bond(self) -> str:
        if len(self.data)==2 and self.data[0].charge.head*self.data[1].charge.head < 0:
            return 'ionic'
        elif sum([i.charge.head<0 for i in self.data]) == len(self.data):
            return 'covalent'
        elif sum([i.charge.head>0 for i in self.data]) == len(self.data):
            return 'metallic'
        else:
            return 'unknown'
        
    @property
    def solubility(self) -> bool:
        if self.bond == 'ionic':
            a, b = (i.symbol for i in self.data)
            a = 'Hg2' if self.data[0].symbol=='Hg' and self.data[0].quantity==2 else a
            for rule in Table.solubility:
                if rule.match(a, b):
                    return True
        return False
    
    @property
    def count(self) -> Dict[str, int]:
        counter: Dict[str, int] = dict()
        for each in self.data:
            for key, value in each.count.items():
                counter[key] = counter[key]+value if key in counter else value
        result = {key:value*self.coef for key, value in counter.items()}
        return result
    

    def rectify(self, flag:bool) -> Molecule:
        if self.bond == 'ionic':
            if self.data[0].charge.head < 0:
                self.data[0], self.data[1] = self.data[1], self.data[0]
            if flag is True:
                charge = self.data[1].charge.head * self.data[1].quantity / self.data[0].quantity
                if not self.data[0].charge.match(charge):
                    raise Exception('failed to rectify molecule')
            else:
                x = sp.lcm(abs(self.data[0].charge.head), abs(self.data[1].charge.head))
                self.data[0].quantity = abs(int(x/self.data[0].charge.head))
                self.data[1].quantity = abs(int(x/self.data[1].charge.head))
        elif (self.bond=='covalent' and len(self.data)==1 and 
              self.data[0].quantity==1 and self.data[0].symbol in Table.diatomic):
            self.data[0].quantity = 2
        return self
    

class Equation:
    def __init__(self, *args) -> None:
        self.data: List[Molecule] = [Molecule(i) for i in args]

    def __str__(self) -> str:
        return ' + '.join([str(i) for i in self.data])

    @property
    def count(self) -> List[Dict[str, int]]: 
        return [i.count for i in self.data]
    

def balance(reactant: Equation, product: Equation) -> Tuple[Equation, Equation]:
    reactant = deepcopy(reactant)
    product = deepcopy(product)
    count = reactant.count + product.count

    key = {k for i in count for k in i.keys()}
    m = sp.Matrix([[x[s] if s in x else 0 for x in count] for s in key])
    result = sp.linsolve(m)

    if len(result) == 1:
        result = list(result)[0]
    else:
        raise Exception('not solvable')

    multiple = sp.lcm([i.denominator for i in result])
    coef = sp.Array(result) * multiple

    for i in range(len(reactant.data)):
        reactant.data[i].coef = coef[i]
    for i in range(len(product.data)-1):
        product.data[i].coef = abs(coef[i+len(reactant.data)])

    return reactant, product
