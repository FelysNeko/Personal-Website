import Link from "next/link";
import Image from "next/image";
import { LINKREE } from "@/constant/en";
import { getLangFromCookies } from "@/utils/cookies";

const Footer = () => {
  const lang = getLangFromCookies();

  return (
    <footer className="footer items-center p-4 bg-base-200 text-neutral-content">
      <aside className="items-center grid-flow-col">
        <h1 className="mx-2">
          {lang === "cn" ? "由银河猫猫侠维护喵" : "Maintained by FelysNeko"}
        </h1>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        {LINKREE.map((each, i) => (
          <Link key={i} href={each.href} target="_blank">
            <Image src={each.icon} alt="" width={24} height={24} />
          </Link>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
