import { useState, useEffect } from "react";

interface Props {
  mode: string;
  id: string;
}

const Accordion = ({ mode, id }: Props) => {
  const [more, setMore] = useState([{ title: "", text: "" }]);

  useEffect(() => {
    fetch("http://45.77.132.151/api/information", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "more" }),
    })
      .then((response) => response.json())
      .then((data) => setMore(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className={`${mode}-mode`} id={id}>
      <div className="container-lg">
        <h1>more information</h1>
        <div className="accordion" id="accordionMore" data-bs-theme={mode}>
          {more.map((each, index) => (
            <div key={index} className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                >
                  <span className="ms-2">{each.title}</span>
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionMore"
              >
                <div className="accordion-body mx-5">{each.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accordion;
