import type { Metadata } from "next";
import Experience from "@/components/Experience";
import More from "@/components/More";
import Hero from "@/components/Hero";
import { getLangFromCookies } from "@/utils/cookies";

export const metadata: Metadata = {
  title: "FelysNeko",
  description: "Home of FelysNeko",
};

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
