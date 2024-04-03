import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { PROJECT as EN } from "@/constant/en";
import { PROJECT as CN } from "@/constant/cn";

const Project = () => {
  const currentLang = cookies().get("lang")?.value;
  const project = currentLang  === "cn" ? CN : EN;

  return (
    <div className="min-h-screen mx-4 lg:mx-12">
      <h1 className="text-3xl font-bold mb-4">
        {currentLang === "cn" ? "项目" : "PROJECT"}
      </h1>
      <div className="grid xl:grid-cols-2 gap-6">
        {project.map((each, i) => (
          <div
            className="card sm:card-side bg-base-100 shadow-lg shadow-elypink/10"
            key={i}
          >
            <figure className="h-40 sm:h-80 sm:w-1/3 relative">
              <Image
                src={each.image}
                alt=""
                style={{ objectFit: "contain" }}
                fill
              />
            </figure>
            <div className="card-body sm:w-2/3">
              <h2 className="card-title">{each.title}</h2>
              <div>
                {each.skills.map((s, i) => (
                  <div className="badge badge-outline mx-1" key={i}>
                    {s.toUpperCase()}
                  </div>
                ))}
              </div>
              <p>{each.about}</p>
              <div className="card-actions justify-end">
                <Link
                  href={each.github}
                  target="_blank"
                  className="btn btn-primary"
                >
                  GitHub
                  <Image src="/icon/newtab.svg" alt="" width={16} height={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
