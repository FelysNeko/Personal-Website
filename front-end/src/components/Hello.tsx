interface Props {
  mode: string;
}

const Hello = ({ mode }: Props) => {
  const reverseMode = mode === "light" ? "dark" : "light";

  return (
    <section
      className={`${mode}-mode ${mode}-background-image`}
      style={{ paddingTop: "15rem" }}
    >
      <div className="container-lg">
        <h1>Welcome to my website</h1>
        <h5>
          I am a first-year Computer Engineering student at University of
          Waterloo, interested in programming languages.
        </h5>
        <p>This is the landing website that links all my public information.</p>
        <button
          type="button"
          className={`btn mt-3 btn-${reverseMode}`}
          onClick={() => {
            window.open("mailto:kinselysia@outlook.com");
          }}
        >
          Contact Me
        </button>
      </div>
    </section>
  );
};

export default Hello;
