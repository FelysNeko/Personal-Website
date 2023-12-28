interface Props {
  mode: string;
  data: {
    h1: string;
    h5: string;
    p: string;
    email: string;
  };
}

const Hello = ({ mode, data }: Props) => {
  const reverseMode = mode === "light" ? "dark" : "light";

  return (
    <section
      className={`${mode}-mode ${mode}-background-image`}
      style={{ paddingTop: "15rem" }}
    >
      <div className="container-lg">
        <h1>{data.h1}</h1>
        <h5>{data.h5}</h5>
        <p>{data.p}</p>
        <button
          type="button"
          className={`btn mt-3 btn-${reverseMode}`}
          onClick={() => {
            window.open(`mailto:${data.email}`);
          }}
        >
          Contact Me
        </button>
      </div>
    </section>
  );
};

export default Hello;
