import Link from "next/link";
import Image from "next/image";
import { PROJECT } from "@/constant/en";

const Project = () => {
  return (
    <div className="min-h-screen mx-4 lg:mx-12">
      <h1 className="text-3xl font-bold mb-4">PROJECT</h1>
      <div className="grid xl:grid-cols-2 gap-6">
        {PROJECT.map((each, i) => (
          <div
            className="card sm:card-side bg-base-100 shadow-xl shadow-elypink/10"
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
