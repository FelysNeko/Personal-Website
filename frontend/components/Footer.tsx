import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { LINKREE } from "@/constant/en";

const Footer = () => {
  const currentLang = cookies().get("lang")?.value;

  return (
    <footer className="footer items-center p-4 bg-base-200 text-neutral-content">
      <aside className="items-center grid-flow-col">
        <p className="mx-2">
          {currentLang === "cn"
            ? "由银河猫猫侠维护喵"
            : "Maintained by FelysNeko"}
        </p>
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
