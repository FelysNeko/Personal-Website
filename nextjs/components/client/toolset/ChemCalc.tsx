"use client";

interface Props {
  lang: string;
}

const ChemCalc = ({ lang }: Props) => {
  return (
    <div className="h-full">
      <div className="h-full grid md:grid-rows-2 md:grid-flow-col gap-4">
        <div className="border border-neutral-800 skeleton">
          <p className="p-2">
            {lang === "中" ? "前端施工中..." : "Frontend under development..."}
          </p>
        </div>
        <div className="border border-neutral-800 skeleton">
          <p className="p-2">
            {lang === "中" ? "前端施工中..." : "Frontend under development..."}
          </p>
        </div>
        <div className="row-span-2 border border-neutral-800 skeleton">
          <p className="p-2">
            {lang === "中" ? "前端施工中..." : "Frontend under development..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChemCalc;
