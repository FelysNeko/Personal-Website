from fastapi import APIRouter
from fastapi import HTTPException
from typing import List

from fast.chemistry.core import Molecule
from fast.chemistry.core import Equation
from fast.chemistry.core import balance
from fast.chemistry.base import Table
from fast.chemistry.base import lookup


Table.initialize()
router = APIRouter()

@router.get("/lookup")
async def lookup_table(symbol: str):
    try:
        molecule = lookup(symbol)
        result = {
            'mass': molecule.mass,
            'number': molecule.number,
            'symbol': molecule.symbol,
            'charge': molecule.charge.ls,
            'structure': molecule.structure
        }
    except Exception:
        raise HTTPException(status_code=404, detail='molecule not found')
    else:
        return result


@router.get("/molecule")
async def get_molecule(symbol: str):
    try:
        molecule = Molecule(symbol)
        result = {
            'mass': molecule.mass,
            'bond': molecule.bond,
            'symbol': str(molecule),
            'solubility': molecule.solubility
        }
    except Exception:
        raise HTTPException(status_code=500, detail='molecule cannot be constructed')
    else:
        return result


@router.post("/solve")
async def solve_equation(reactant: List[str], product: List[str]):
    try:
        re = Equation(*reactant)
    except Exception:
        raise HTTPException(status_code=500, detail='reactant cannot be constructed')
    
    try:
        pr = Equation(*product)
    except Exception:
        raise HTTPException(status_code=500, detail='production cannot be constructed')
    
    try:
        rre, rpr = balance(re, pr)
        result = {
            'reactant': [str(i) for i in rre.data],
            'product': [str(i) for i in rpr.data]
        }
    except Exception:
        raise HTTPException(status_code=500, detail='cannot solve')
    else:
        return result
