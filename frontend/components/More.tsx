import { MORE } from "@/constant/en";

const More = () => {
  return (
    <div className="min-h-screen mx-4 lg:mx-12 flex flex-col place-items-center">
      <h1 className="text-3xl font-bold mb-4">MORE</h1>
      {MORE.map((each, i) => (
        <div
          className="collapse collapse-arrow bg-base-100 max-w-4xl my-2 ms-4 border-s-2 border-elypink/50"
          key={i}
        >
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">{each.topic}</div>
          <div className="collapse-content">
            <p>{each.response}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default More;
