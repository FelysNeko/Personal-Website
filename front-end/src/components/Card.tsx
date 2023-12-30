import image from "../images/firemoth-gold.png"

interface Props {
  mode: string;
  data: {
    title: string;
    tech: string[];
    pic: string;
    text: string;
    link: string;
  };
}

const Card = ({ mode, data }: Props) => {
  const reverseMode = mode === "light" ? "dark" : "light";

  return (
    <div
      className="card mb-4"
      style={{ maxWidth: "36rem" }}
      data-bs-theme={mode}
    >
      <img src={image} className="card-img-top" alt="" />
      <div className="card-body">
        <p>
          {data.tech.map((x) => (
            <span key={x} className={`badge mx-1 text-bg-${reverseMode}`}>
              {x}
            </span>
          ))}
        </p>
        <h5 className="card-text">{data.title}</h5>
        <p className="card-text">{data.text}</p>
      </div>
      <button
        type="button"
        className={`btn btn-${reverseMode}`}
        onClick={() => {
          window.open(data.link, "_blank");
        }}
      >
        repository link
      </button>
    </div>
  );
};

export default Card;
