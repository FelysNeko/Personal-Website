import CodeExecArea from "@/components/client/CodeExecArea";
import { cookies } from "next/headers";
import { FELYS as EN } from "@/constant/en";
import { FELYS as CN } from "@/constant/cn";

const Felys = () => {
  const currentLang = cookies().get("lang")?.value;
  const felys = currentLang === "cn" ? CN : EN;

  return (
    <>
      <section className="h-20" />
      <div className="min-h-screen mx-4 lg:mx-12">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {currentLang === "cn"
            ? "在线FELYS解释器"
            : "Felys Interpreter Playground"}
        </h1>
        <div className="lg:flex">
          <div className="lg:w-2/3">
            <CodeExecArea lang={currentLang} />
          </div>
          <section className="h-20" />
          <div className="lg:w-1/3 flex items-center">
            <div className="m-2 lg:mx-6 space-y-3">
              <h3 className="text-2xl font-bold">
                {currentLang === "cn" ? "支持的操作" : "FEATURES"}
              </h3>
              {Object.entries(felys).map(([key, value]) => (
                <div key={key}>
                  <h5 className="text-lg">{key}</h5>
                  <ul className="list-disc ms-6">
                    {value.map((each, i) => (
                      <li key={i}>
                        <code>{each}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Felys;
