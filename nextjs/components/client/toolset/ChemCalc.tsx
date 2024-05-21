"use client";
import { useRef, useState } from "react";
import { capitalize } from "@/utils/general";

interface Props {
  lang: string;
}

const ChemCalc = ({ lang }: Props) => {
  return (
    <div className="h-full">
      <div className="h-full grid md:grid-rows-2 md:grid-flow-col gap-4">
        <Atom lang={lang} />
        <Molecule lang={lang} />
        <Balance lang={lang} />
      </div>
    </div>
  );
};

const Atom = ({ lang }: Props) => {
  type Atom = {
    number: string;
    symbol: string;
    mass: number;
    charge: number[];
    structure: string;
  };
  const [atom, setAtom] = useState<Atom | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const reload = async (symbol: string) => {
    const response = await fetch(
      `https://api.felysneko.com/fast/chemistry/lookup?symbol=${symbol}`
    ).catch((e) => console.log(e));

    if (response && response.ok) {
      const data: Atom = await response.json();
      setAtom(data);
    } else {
      setAtom(null);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      reload(e.target.value);
    }, 150);
  };

  return (
    <div className="overflow-x-auto">
      <div className="border-b">
        <input
          className="input w-full"
          placeholder={
            lang === "中" ? "输入一个原子（区分大小写）" : "Enter an atom (case sensitive)"
          }
          onChange={handleInput}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>{lang === "中" ? "类别" : "Category"}</th>
            <th>{lang === "中" ? "参数" : "Data"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{lang === "中" ? "原子序数" : "Number"}</th>
            <td>{atom?.number}</td>
          </tr>
          <tr>
            <th>{lang === "中" ? "符号" : "Symbol"}</th>
            <td>{atom?.symbol}</td>
          </tr>
          <tr>
            <th>{lang === "中" ? "质量" : "Mass"}</th>
            <td>{atom?.mass}</td>
          </tr>
          <tr>
            <th>{lang === "中" ? "化学价" : "Charge"}</th>
            <td>{atom?.charge.join(" ")}</td>
          </tr>
          <tr>
            <th>{lang === "中" ? "结构" : "Structure"}</th>
            <td>{atom?.structure}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Molecule = ({ lang }: Props) => {
  type Molecule = {
    symbol: string;
    mass: number;
    bond: string;
    solubility: boolean;
  };
  const [molecule, setMolecule] = useState<Molecule | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const reload = async (symbol: string) => {
    const response = await fetch(
      `https://api.felysneko.com/fast/chemistry/molecule?symbol=${symbol}`
    ).catch((e) => console.log(e));

    if (response && response.ok) {
      const data: Molecule = await response.json();
      setMolecule(data);
    } else {
      setMolecule(null);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      reload(e.target.value);
    }, 150);
  };

  return (
    <div className="overflow-x-auto">
      <div className="border-b ">
        <input
          className="input w-full"
          placeholder={
            lang === "中" ? "输入一个分子（区分大小写）" : "Enter a molecule (case sensitive)"
          }
          onChange={handleInput}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>{lang === "中" ? "类别" : "Category"}</th>
            <th>{lang === "中" ? "参数" : "Data"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{lang === "中" ? "符号" : "Symbol"}</th>
            <td>{molecule?.symbol}</td>
          </tr>
          <tr>
            <th>{lang === "中" ? "质量" : "Mass"}</th>
            <td>{molecule?.mass}</td>
          </tr>
          <tr>
            <th>{lang === "中" ? "结合" : "Bond"}</th>
            <td>{molecule && capitalize(molecule?.bond)}</td>
          </tr>
          <tr>
            <th>{lang === "中" ? "溶解" : "Solubility"}</th>
            <td>{molecule && capitalize(`${molecule.solubility}`)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Balance = ({ lang }: Props) => {
  return (
    <div className="row-span-2 border-y border-neutral-800 skeleton">
      <p className="p-2">
        {lang === "中" ? "前端施工中..." : "Frontend under development..."}
      </p>
    </div>
  );
};

export default ChemCalc;
