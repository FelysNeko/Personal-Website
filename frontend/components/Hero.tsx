import Link from "next/link";
import Image from "next/image";
import { LINKREE } from "@/constant";

const Hero = () => {
  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="h-96 w-full relative">
          <Image
            src="/firemoth-light.png"
            alt=""
            style={{ objectFit: "contain" }}
            fill
          />
          <em className="absolute bottom-0 end-0 text-xs opacity-40">
            Image from Honkai Impact 3rd
          </em>
        </div>
        <div>
          <h1 className="text-5xl font-bold">FelysNeko</h1>
          <p className="py-6">
            Welcome to my landing page. I&apos;m an undergraduate student at the
            University of Waterloo. I do full-stack web development and
            interested in building programming languages. Feel free to reach out
            to me if you have any interesting project.
          </p>
          <div className="flex items-center">
            <Link
              href="mailto:kinselysia@outlook.com"
              className="btn btn-primary me-4"
            >
              EMAIL ME
            </Link>
            {LINKREE.map((each, i) => (
              <Link
                key={i}
                href={each.href}
                className="mx-1"
                target="_blank"
              >
                <Image src={each.icon} alt="" width={28} height={28} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
