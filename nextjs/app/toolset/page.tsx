import ToolsetArea from "@/components/client/ToolsetArea";
import { getLangFromCookies } from "@/utils/cookies";

const Toolset = () => {
  const lang = getLangFromCookies();

  return (
    <section className="min-h-screen pt-20">
      <ToolsetArea lang={lang}/>
    </section>
  );
};

export default Toolset;
