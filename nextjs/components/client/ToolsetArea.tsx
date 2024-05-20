"use client";
import { Fragment, useState } from "react";
import ChemCalc from "./toolset/ChemCalc";
import ImageProc from "./toolset/ImageProc";
import Future from "./toolset/Future";

interface Props {
  lang: string;
}

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

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
    <div role="tablist" className="tabs tabs-lifted">
      {TOOLSET.map((proj) => (
        <Fragment key={proj.en}>
          <button
            role="tab"
            className={`tab overflow-hidden ${
              tool === proj.en ? "tab-active" : ""
            }`}
            onClick={() => setTool(proj.en)}
          >
            {lang === "中" ? proj.cn : capitalize(proj.en)}
          </button>
          <div
            role="tabpanel"
            className="tab-content h-[calc(100vh-192px)] border-neutral-800 min-h-96"
          >
            {proj.node}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default ToolsetArea;
