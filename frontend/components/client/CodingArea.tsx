"use client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";

interface Props {
  lang: string;
}

const sample: string = `x = 13;

if x == 1 {
    print 'hello world!';
} elif x == 13 {
    while x > 0 {
        print x;
        x = x - 1;
    }
} else {
    print 42;
}

print 'Elysia is my waifu!';
print '我永远单推爱莉！';
`;

const CodingArea = ({ lang }: Props) => {
  const [code, setCode] = useState<string | undefined>(sample);
  const [result, setResult] = useState("");

  const handleExecute = async () => {
    const response =
      code &&
      (await fetch("https://api.felysneko.com/felys/exec", {
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
      <div className="lg:w-1/2 h-[calc(100vh-200px)]">
        <Editor
          theme="vs-dark"
          defaultValue={sample}
          onChange={(c) => setCode(c)}
          options={{ fontSize: 18 }}
          height={`calc(100% - 48px)`}
        />
        <button className="btn btn-primary w-full" onClick={handleExecute}>
          {lang === "cn" ? "运行" : "EXECUTE"}
        </button>
      </div>
      <div className="lg:w-1/2 h-[calc(100vh-200px)] border border-neutral-800 overflow-auto">
        <p className="whitespace-pre-wrap p-2">
          <code className="text-lg text-elypink">{result}</code>
        </p>
      </div>
    </div>
  );
};

export default CodingArea;
