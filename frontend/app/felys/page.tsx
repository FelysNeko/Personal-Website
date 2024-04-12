import CodeExecArea from "@/components/client/CodeExecArea";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { FELYS as EN } from "@/constant/en";
import { FELYS as CN } from "@/constant/cn";

const Felys = () => {
  const currentLang = cookies().get("lang")?.value;
  const felys = currentLang === "cn" ? CN : EN;

  return (
    <section className="min-h-screen pt-20">
      <h1 className="text-3xl font-bold mb-4">
        {currentLang === "cn" ? "FELYS解释器" : "FELYS INTERPRETER"}
      </h1>
      <div className="lg:flex">
        <div className="lg:w-2/3">
          <CodeExecArea lang={currentLang} />
        </div>
        <section className="h-10" />
        <div className="lg:w-1/3">
          <div className="m-2 lg:mx-6 space-y-6">
            <h3 className="text-2xl font-bold">
              {currentLang === "cn" ? "说明书" : "MANUAL"}
            </h3>
            <em>
              {currentLang === "cn"
                ? "FELYS是我自己的语言，运行在用Rust编写的FELYS解释器上，现在支持表达式运算和变量赋值，如果想要体验条件和循环关键字，可以参考上游Felys-Project中用C写的旧版解释器（但写的并不好），需自行编译。"
                : "Felys-Interpreter is written in Rust, currently support expression evaluation and variable assignment. The upstream, Felys-Project, has more features."}
            </em>
            {felys.map((each) => (
              <div key={each.topic}>
                <h5 className="text-lg">{each.topic}</h5>
                <ul className="list-disc ms-6">
                  {each.content.map((e, i) => (
                    <li key={i}>
                      <code>{e}</code>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href="https://github.com/FelysNeko/Felys-Interpreter"
              target="_blank"
              className="btn btn-primary"
            >
              GitHub
              <Image src="/icon/newtab.svg" alt="" width={16} height={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Felys;
