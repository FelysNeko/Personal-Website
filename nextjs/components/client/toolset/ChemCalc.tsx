"use client";

interface Props {
  lang: string;
}

const ChemCalc = ({ lang }: Props) => {
  return (
    <div className="h-full">
      <div className="p-2">
        {lang === "中" ? "前端施工中......" : "Frontend under development....."}
      </div>
    </div>
  );
};

export default ChemCalc;
