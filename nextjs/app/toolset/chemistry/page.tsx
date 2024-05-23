import ChemCalc from "@/components/client/toolset/ChemCalc";
import { getLangFromCookies } from "@/utils/cookies";

const Chemistry = () => {
  const lang = getLangFromCookies();

  return <ChemCalc lang={lang} />;
};

export default Chemistry;
