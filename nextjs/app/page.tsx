import Experience from "@/components/Experience";
import More from "@/components/More";
import Hero from "@/components/Hero";
import { getLangFromCookies } from "@/utils/cookies";


const Home = () => {
  const lang = getLangFromCookies();

  return (
    <>
      <Hero lang={lang} />
      <Experience lang={lang} />
      <More lang={lang} />
    </>
  );
};

export default Home;
