"use client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { DOCS as EN } from "@/constant/en";
import { DOCS as CN } from "@/constant/cn";

interface Props {
  lang: string;
}

const sample: string = `let greet = |x| {
    render 'hello ' + x + '!';
}

greet('world');
`;

const CodingArea = ({ lang }: Props) => {
  const document = lang === "中" ? CN : EN;
  const [code, setCode] = useState<string | undefined>(sample);
  const [docs, setDocs] = useState(false);
  const [result, setResult] = useState("");

  const handleExecute = async () => {
    const response =
      code &&
      (await fetch("https://api.felysneko.com/axum/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: code }),
      }).catch((e) => console.log(e)));

    if (response && response.ok) {
      const data = await response.text();
      setResult(data);
    }
  };

  return (
    <>
      <div className="lg:flex">
        <div className="lg:w-1/2 min-h-60 h-[calc(100vh-308px)] lg:h-[calc(100vh-160px)]">
          <Editor
            theme="vs-dark"
            defaultValue={sample}
            onChange={(c) => setCode(c)}
            loading={<div className="skeleton w-full h-full" />}
            options={{
              fontSize: 18,
              lineNumbers: "off",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              scrollbar: { horizontal: "hidden" },
              minimap: {
                enabled: false,
              },
            }}
            height={`calc(100% - 48px)`}
          />
          <button className="btn w-1/2" onClick={() => setDocs(true)}>
            {lang === "中" ? "文档" : "DOCS"}
          </button>
          <button className="btn w-1/2 text-elypink" onClick={handleExecute}>
            {lang === "中" ? "运行" : "EXECUTE"}
          </button>
        </div>
        <div className="lg:w-1/2 min-h-40 lg:min-h-60 lg:h-[calc(100vh-160px)] border border-neutral-800 overflow-auto firemoth">
          <p className="whitespace-pre-wrap p-2">
            <code className="text-lg">{result}</code>
          </p>
        </div>
      </div>
      <dialog className="modal modal-bottom" open={docs}>
        <div className="modal-box">
          <h3 className="font-bold text-lg lg:px-6 text-elypink">
            {lang === "中" ? "文档" : "DOCS"}
          </h3>
          <p className="py-4 lg:px-6">{document}</p>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-primary"
                onClick={() => setDocs(false)}
              >
                {lang === "中" ? "关闭" : "CLOSE"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CodingArea;
