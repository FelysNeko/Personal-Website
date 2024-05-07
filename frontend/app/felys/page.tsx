import CodingArea from "@/components/client/CodingArea";
import { getLangFromCookies } from "@/utils/cookies";

const Felys = () => {
  const lang = getLangFromCookies();

  return (
    <section className="min-h-screen pt-20">
      <h1 className="text-3xl font-bold mb-4">
        {lang === "中" ? "FELYS解释器" : "FELYS INTERPRETER"}
      </h1>
      <CodingArea lang={lang} />
    </section>
  );
};

export default Felys;
