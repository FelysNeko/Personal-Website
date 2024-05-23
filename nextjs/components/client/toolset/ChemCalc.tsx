"use client";
import { useEffect, useRef, useState } from "react";
import { capitalize } from "@/utils/general";

interface Props {
  lang: string;
}

const ChemCalc = ({ lang }: Props) => {
  return (
    <div className="grid md:grid-cols-2 md:grid-rows-6 md:grid-flow-col gap-6">
      <Atom lang={lang} />
      <Molecule lang={lang} />
      <Balance lang={lang} />
      <Note lang={lang} />
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
    <div className="md:row-span-3">
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
    <div className="md:row-span-3">
      <div className="border-b">
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
  type Equation = {
    reactant: string[];
    product: string[];
  };

  const [reactant, setReactant] = useState<string[]>(["", ""]);
  const [product, setProduct] = useState<string[]>(["", ""]);
  const [reResult, setReResult] = useState("");
  const [prResult, setPrResult] = useState("");

  const reload = async () => {
    const response =
      reactant.every((e) => e !== "") &&
      product.every((e) => e !== "") &&
      (await fetch("https://api.felysneko.com/fast/chemistry/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reactant: reactant,
          product: product,
        }),
      }).catch((e) => console.log(e)));

    if (response && response.ok) {
      const data: Equation = await response.json();
      setReResult(data.reactant.join(" + "));
      setPrResult(data.product.join(" + "));
    } else {
      setReResult("");
      setPrResult("");
    }
  };

  useEffect(() => {
    reload();
  }, [reactant.length, product.length]);

  return (
    <div className="md:row-span-4 md:relative">
      <h1 className="text-xl font-bold">
        {lang === "中" ? "分子式配平" : "Equation Balancer"}
      </h1>
      <form className="grid grid-cols-2 gap-4 mt-4" onChange={reload}>
        <div className="space-y-2">
          <ul className="border-y border-b-neutral-800 lg:border-t-neutral-800 space-y-2 py-2">
            {reactant.map((_, i) => (
              <li key={i}>
                <input
                  className="input w-full"
                  placeholder={lang === "中" ? "反应物" : "Reactant"}
                  onChange={(e) =>
                    setReactant((prev) => {
                      prev[i] = e.target.value;
                      return prev;
                    })
                  }
                />
              </li>
            ))}
          </ul>
          <div className="flex gap-2 me-2">
            {reactant.length <= 2 && (
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setReactant((prev) => [...prev, ""])}
              >
                {PLUS}
              </button>
            )}
            {reactant.length >= 2 && (
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setReactant((prev) => prev.slice(0, -1))}
              >
                {DASH}
              </button>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <ul className="border-y border-b-neutral-800 lg:border-t-neutral-800 space-y-2 py-2">
            {product.map((_, i) => (
              <li key={i}>
                <input
                  className="input w-full"
                  placeholder={lang === "中" ? "产出物" : "Product"}
                  onChange={(e) =>
                    setProduct((prev) => {
                      prev[i] = e.target.value;
                      return prev;
                    })
                  }
                />
              </li>
            ))}
          </ul>
          <div className="flex gap-2 me-2">
            {product.length <= 2 && (
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setProduct((prev) => [...prev, ""])}
              >
                {PLUS}
              </button>
            )}
            {product.length >= 2 && (
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setProduct((prev) => prev.slice(0, -1))}
              >
                {DASH}
              </button>
            )}
          </div>
        </div>
      </form>
      <table className="table md:absolute md:bottom-0">
        <thead>
          <tr>
            <th>{lang === "中" ? "类别" : "Category"}</th>
            <th>{lang === "中" ? "参数" : "Data"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{lang === "中" ? "反应物" : "Reactant"}</th>
            <td>{reResult}</td>
          </tr>
          <tr>
            <th>{lang === "中" ? "产出物" : "Product"}</th>
            <td>{prResult}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Note = ({ lang }: Props) => {
  return (
    <div className="md:row-span-2 py-2 flex flex-col items-center justify-center border-y border-neutral-800">
      <h3 className="text-lg font-bold text-elypink">
        {lang === "中" ? "写在最后" : "EXTRA NOTES"}
      </h3>
      <p className="max-w-lg">
        {lang === "中"
          ? "输入分子之后，后端会自动尝试计算，不过项目是高中的时候为了11年级化学题写的，所以给出的答案不一定是最好的，同时，这也是我的第一个大项目，所以整体也写的也挺烂的。"
          : "You need enter the molecules, and the backend will try to calculate them automatically. However, since this project was written in high school for high school level chemistry, typically grade 11, it might not give you the best answer. Plus, this was my first ever major project, meaning it was not well written anyways."}
      </p>
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
      fillRule="evenodd"
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
      fillRule="evenodd"
      d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"
    />
  </svg>
);

export default ChemCalc;
