"use client";
import { FormEvent, useState } from "react";

interface Props {
  lang: string | undefined;
}

const CodeExecArea = ({ lang }: Props) => {
  const [result, setResult] = useState("");

  const handleExecute = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const code = formData.get("code");
    const codeList = code?.toString().split("\n");
    console.log(codeList);

    const response = await fetch("https://api.felysneko.com/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: codeList }),
    }).catch((e) => console.log(e));

    if (response && response.ok) {
      const data = await response.json();
      setResult(data.result);
    }
  };

  return (
    <form className="m-2" onSubmit={handleExecute}>
      <em className="mx-2">{lang === "cn" ? "输入" : "Input"}</em>
      <code>
        <textarea
          className="textarea w-full h-96 resize-none border border-neutral-800 text-lg m-1"
          name="code"
        />
      </code>
      <em className="mx-2">{lang === "cn" ? "输出" : "Output"}</em>
      <div className="w-full h-24 border border-neutral-800 m-1 overflow-auto">
        <pre className="m-2">{result}</pre>
      </div>
      <button className="btn w-full m-1">
        {lang === "cn" ? "运行" : "EXECUTE"}
      </button>
    </form>
  );
};

export default CodeExecArea;
