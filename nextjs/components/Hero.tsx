import Link from "next/link";
import Image from "next/image";
import { LINKTREE } from "@/constant/en";

interface Props {
  lang: string;
}

const Hero = ({ lang }: Props) => {
  return (
    <section className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="h-96 w-full relative">
          <Image
            src="/firemoth-light.png"
            alt=""
            style={{ objectFit: "contain" }}
            fill
          />
          <em className="absolute bottom-0 end-0 text-xs opacity-40 text-elypink">
            {lang === "中" ? "图片源自崩坏三" : "Image from Honkai Impact 3rd"}
          </em>
        </div>
        <div className="">
          <h1 className="text-5xl font-bold text-elypink">
            {lang === "中" ? "银河猫猫侠" : "FelysNeko"}
          </h1>
          <p className="py-6">
            {lang === "中"
              ? "欢迎来到我的主页，本人现在坐标加拿大在滑铁卢大学读本科。有一些全栈开发经验，并且对制作编程语言和计算机底层感兴趣，目标是未来能从事相关的开发。如果有什么有意思的项目欢迎来联系我喵～"
              : "Welcome to my landing page. I'm an undergraduate student at the University of Waterloo. I do full-stack web development and interested in programming languages. Feel free to contact me if you have any interesting project."}
          </p>
          <div className="flex items-center">
            <Link
              href="mailto:kinselysia@outlook.com"
              className="btn btn-primary me-4"
            >
              {lang === "中" ? "联系我" : "CONTACT ME"}
            </Link>
            {LINKTREE.map((each, i) => (
              <Link key={i} href={each.href} className="mx-1" target="_blank">
                <Image src={each.icon} alt="" width={28} height={28} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
