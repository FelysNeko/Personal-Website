import { useState, useEffect } from "react";

interface Props {
  mode: string;
}

const Hello = ({ mode }: Props) => {
  const reverseMode = mode === "light" ? "dark" : "light";
  const [hello, setHello] = useState({ h1: "", h5: "", p: "", email: "" });

  useEffect(() => {
    fetch("http://45.77.132.151/api/information", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "hello" }),
    })
      .then((response) => response.json())
      .then((data) => setHello(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section
      className={`${mode}-mode ${mode}-background-image`}
      style={{ paddingTop: "15rem" }}
    >
      <div className="container-lg">
        <h1>{hello.h1}</h1>
        <h5>{hello.h5}</h5>
        <p>{hello.p}</p>
        <button
          type="button"
          className={`btn mt-3 btn-${reverseMode}`}
          onClick={() => {
            window.open(`mailto:${hello.email}`);
          }}
        >
          Contact Me
        </button>
      </div>
    </section>
  );
};

export default Hello;
