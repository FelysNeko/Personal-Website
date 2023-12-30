import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import Header from "./components/Header";
import CardContainer from "./components/CardContainer";
import Hello from "./components/Hello";
import Footer from "./components/Footer";
import Accordion from "./components/Accordion";
import { useState, useEffect } from "react";

const template = {
  hello: { h1: "", h5: "", p: "", email: "" },
  projects: [{ title: "", tech: [""], pic: "", text: "", link: "" }],
  links: [{ platform: "", href: "" }],
  more: [{ title: "", text: "" }],
};

function App() {
  const [mode, setMode] = useState("light");
  const [data, setData] = useState(template);

  useEffect(() => {
    fetch("http://galaxyneko.website/api/information")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {data !== template && (
        <>
          <Header mode={mode} setMode={setMode} data={data.links} />

          <section className={`${mode}-mode`} id="home" />
          <Hello mode={mode} data={data.hello} />
          <CardContainer mode={mode} data={data.projects} id="projects" />
          <Accordion mode={mode} data={data.more} id="more" />

          <Footer mode={mode} />
        </>
      )}
    </>
  );
}

export default App;
