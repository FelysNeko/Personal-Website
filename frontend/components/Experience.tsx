import { cookies } from "next/headers";
import { EXPERIENCE as EN } from "@/constant/en";
import { EXPERIENCE as CN } from "@/constant/cn";

const Experience = () => {
  const currentLang = cookies().get("lang")?.value;
  const experience = currentLang === "en" ? EN : CN;

  return (
    <div className="min-h-screen mx-4 lg:mx-12">
      <h1 className="text-3xl font-bold mb-4">
        {currentLang === "en" ? "EXPERIENCE" : "经历"}
      </h1>
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        {experience.map((each, i) => (
          <li key={i}>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div
              className={`mb-12 max-w-xl ${
                i % 2 ? "timeline-end" : "timeline-start md:text-end"
              }`}
            >
              <time className="italic">{each.time}</time>
              <h1 className="text-xl font-black text-elypink">{each.title}</h1>
              <h5 className="text-xs">{each.employer}</h5>
              <p className="my-2">{each.about}</p>
              {each.skills.map((s, i) => (
                <div className="badge badge-outline mx-1" key={i}>
                  {s.toUpperCase()}
                </div>
              ))}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Experience;
