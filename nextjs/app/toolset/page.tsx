import ToolsetArea from "@/components/client/ToolsetArea";
import { getLangFromCookies } from "@/utils/cookies";

const Toolset = () => {
  const lang = getLangFromCookies();

  return (
    <section className="min-h-screen pt-20">
      <h1 className="text-3xl font-bold mb-4">
        {lang === "中" ? "FELYS工具栏" : "FELYS TOOLSET"}
      </h1>
      <ToolsetArea lang={lang}/>
    </section>
  );
};

export default Toolset;
