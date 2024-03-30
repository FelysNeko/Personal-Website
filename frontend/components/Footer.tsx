import Link from "next/link";
import Image from "next/image";
import { LINKREE } from "@/constant";

const Footer = () => {
  return (
    <footer className="footer items-center p-4 bg-base-200 text-neutral-content">
      <aside className="items-center grid-flow-col">
        <p>Maintained by FelysNeko</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        {LINKREE.map((each, i) => (
          <Link key={i} href={each.href} className="mx-1" target="_blank">
            <Image src={each.icon} alt="" width={24} height={24} />
          </Link>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
