import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import Header from "./components/Header";
import CardContainer from "./components/CardContainer";
import Hello from "./components/Hello";
import Footer from "./components/Footer";
import Accordion from "./components/Accordion";
import { useState} from "react";
import data from "./data.json"

function App() {
  const [mode, setMode] = useState("light");

  return (
    <>
      <Header mode={mode} setMode={setMode} data={data.links} />

      <section className={`${mode}-mode`} id="home" />
      <Hello mode={mode} data={data.hello} />
      <CardContainer mode={mode} data={data.projects} id="projects" />
      <Accordion mode={mode} data={data.more} id="more" />

      <Footer mode={mode} />
    </>
  );
}

export default App;
