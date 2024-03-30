import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Project from "@/components/Project";

const Home = () => {
  return (
    <>
      <Hero />
      <section id="experience" className="h-20" />
      <Experience />
      <section id="project" className="h-20" />
      <Project />
      <section id="faq" className="h-20" />
    </>
  );
};

export default Home;
