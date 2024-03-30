import Experience from "@/components/Experience";
import More from "@/components/More";
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
      <section id="more" className="h-20" />
      <More />
      <section className="h-20" />
    </>
  );
};

export default Home;
