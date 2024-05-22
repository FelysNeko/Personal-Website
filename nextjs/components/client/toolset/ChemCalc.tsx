"use client";
import { useRef, useState } from "react";
import { capitalize } from "@/utils/general";

interface Props {
  lang: string;
}

const ChemCalc = ({ lang }: Props) => {
  return (
    <div className="grid md:grid-rows-2 md:grid-flow-col gap-6">
      <Atom lang={lang} />
      <Molecule lang={lang} />
      <Balance lang={lang} />
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
    <div>
      <div className="border-b">
        <input
          className="input w-full"
          placeholder={
            lang === "中"
              ? "输入一个原子（区分大小写）"
              : "Enter an atom (case sensitive)"
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
            <th>{lang === "中" ? "序数" : "Number"}</th>
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
            <th>{lang === "中" ? "结构" : "Structure"}</th>
            <td>{atom?.structure}</td>
          </tr>
          <tr>
            <th>{lang === "中" ? "价" : "Valence"}</th>
            <td>{atom?.charge.join(" ")}</td>
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
    <div>
      <div className="border-b ">
        <input
          className="input w-full"
          placeholder={
            lang === "中"
              ? "输入一个分子（区分大小写）"
              : "Enter a molecule (case sensitive)"
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
  const [reCount, setReCount] = useState(2);
  const [prCount, setPrCount] = useState(2);

  return (
    <div className="lg:row-span-2">
      <form className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <ul className="border-y border-b-neutral-800 lg:border-t-neutral-800 space-y-2 py-2">
            {Array.from({ length: reCount }).map((_, i) => (
              <li key={i}>
                <input
                  className="input w-full input-disabled"
                  placeholder={lang === "中" ? "反应物" : "Reactant"}
                />
              </li>
            ))}
          </ul>
          <div className="flex gap-2 me-2">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => reCount <= 4 && setReCount(reCount + 1)}
            >
              {PLUS}
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => reCount >= 2 && setReCount(reCount - 1)}
            >
              {DASH}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <ul className="border-y border-b-neutral-800 lg:border-t-neutral-800 space-y-2 py-2">
            {Array.from({ length: prCount }).map((_, i) => (
              <li key={i}>
                <input
                  className="input w-full input-disabled"
                  placeholder={lang === "中" ? "产出物" : "Product"}
                />
              </li>
            ))}
          </ul>
          <div className="flex gap-2 me-2">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => prCount <= 4 && setPrCount(prCount + 1)}
            >
              {PLUS}
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => prCount >= 2 && setPrCount(prCount - 1)}
            >
              {DASH}
            </button>
          </div>
        </div>
      </form>
      <p className="p-2">{lang === "中" ? "前端施工中..." : "Frontend under development..."}</p>
    </div>
  );
};

const PLUS = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
    />
  </svg>
);

const DASH = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"
    />
  </svg>
);

export default ChemCalc;
