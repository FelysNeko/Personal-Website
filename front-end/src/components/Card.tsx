import { useEffect, useState } from "react";

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
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch("http://galaxyneko.website/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: data.pic }),
      });
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImage(imageObjectURL);
    };
    fetchImage().catch((error) => console.log(error));
  }, [data.pic]);

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
