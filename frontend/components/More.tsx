import { cookies } from "next/headers";
import { MORE as EN } from "@/constant/en";
import { MORE as CN } from "@/constant/cn";

const More = () => {
  const currentLang = cookies().get("lang")?.value;
  const more = currentLang === "cn" ? CN : EN;

  return (
    <div className="min-h-screen mx-4 lg:mx-12 flex flex-col place-items-center">
      <h1 className="text-3xl font-bold mb-4">
        {currentLang === "cn" ? "更多" : "MORE"}
      </h1>
      {more.map((each, i) => (
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
