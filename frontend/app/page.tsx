import Experience from "@/components/Experience";
import More from "@/components/More";
import Hero from "@/components/Hero";
import Project from "@/components/Project";
import { getLangFromCookies } from "@/utils/cookies";

const Home = () => {
  const lang = getLangFromCookies();

  return (
    <>
      <Hero lang={lang} />
      <Experience lang={lang} />
      <Project lang={lang} />
      <More lang={lang} />
    </>
  );
};

export default Home;
