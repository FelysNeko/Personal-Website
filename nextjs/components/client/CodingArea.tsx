"use client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";

interface Props {
  lang: string;
}

const sample: string = `let greet = |x| {
    render 'hello ' + x + '!';
}

greet('world');
`;

const docs: string = `Coming soon...`;

const CodingArea = ({ lang }: Props) => {
  const [code, setCode] = useState<string | undefined>(sample);
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
        <button className="btn w-1/2" onClick={() => setResult(docs)}>
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
  );
};

export default CodingArea;
