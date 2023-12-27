import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import Header from "./components/Header";
import CardContainer from "./components/CardContainer";
import Hello from "./components/Hello";
import Footer from "./components/Footer";
import Accordion from "./components/Accordion";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("dark");

  return (
    <>
      <Header mode={mode} setMode={setMode} />

      <section className={`${mode}-mode`} id="home" />
      <Hello mode={mode} />
      <CardContainer mode={mode} id="projects" />
      <Accordion mode={mode} id="more" />

      <Footer mode={mode} />
    </>
  );
}

export default App;
