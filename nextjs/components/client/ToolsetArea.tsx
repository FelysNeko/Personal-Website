"use client";
import { Fragment, useState } from "react";
import ChemCalc from "./toolset/ChemCalc";
import ImageProc from "./toolset/ImageProc";
import Future from "./toolset/Future";
import { capitalize } from "@/utils/general";

interface Props {
  lang: string;
}

const ToolsetArea = ({ lang }: Props) => {
  const [tool, setTool] = useState("image");
  const TOOLSET = [
    {
      cn: "图片处理",
      en: "image",
      node: <ImageProc lang={lang} />,
    },
    {
      cn: "化学计算器",
      en: "chemistry",
      node: <ChemCalc lang={lang} />,
    },
    {
      cn: "未来",
      en: "future",
      node: <Future lang={lang} />,
    },
  ];

  return (
    <>
      <div role="tablist" className="tabs tabs-bordered">
        {TOOLSET.map((proj) => (
          <button
            key={proj.en}
            role="tab"
            className={`tab overflow-hidden ${
              tool === proj.en ? "tab-active" : ""
            }`}
            onClick={() => setTool(proj.en)}
          >
            {lang === "中" ? proj.cn : capitalize(proj.en)}
          </button>
        ))}
      </div>

      <div className="h-[calc(100vh-156px)] mt-4 min-h-96">
        {TOOLSET.map((proj) => (
          <Fragment key={proj.en}>{tool === proj.en && proj.node}</Fragment>
        ))}
      </div>
    </>
  );
};

export default ToolsetArea;
