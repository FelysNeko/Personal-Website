import Card from "./Card";
import { useState, useEffect } from "react";

interface Props {
  mode: string;
  id: string;
}

const CardContainer = ({ mode, id }: Props) => {
  const [projects, setProjects] = useState([
    { title: "", tech: [""], pic: "", text: "", link: "" },
  ]);

  useEffect(() => {
    fetch("http://127.0.0.1:9090/api/information", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "projects" }),
    })
      .then((response) => response.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <section className={`${mode}-mode`} id={id}>
      <div className="container-lg">
        <h1>projects</h1>
        <div className="row">
          {projects.map((each) => (
            <div
              key={each.title}
              className="col-lg-4 d-flex justify-content-center"
            >
              <Card mode={mode} info={each} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardContainer;
