import ImageProc from "@/components/client/toolset/ImageProc";
import { getLangFromCookies } from "@/utils/cookies";

const Image = () => {
  const lang = getLangFromCookies();

  return <ImageProc lang={lang} />;
};

export default Image;
