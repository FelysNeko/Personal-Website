import Image from "next/image";
import Link from "next/link";
import ChangeLangBtn from "@/components/client/ChangeLangBtn";
import { NAVIGATION as EN } from "@/constant/en";
import { NAVIGATION as CN } from "@/constant/cn";
import { cookies } from "next/headers";

const Navbar = () => {
  const currentLang = cookies().get("lang")?.value;
  const navigation = currentLang === "cn" ? CN : EN;

  return (
    <div className="navbar fixed z-[2] bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navigation.map((each) => (
              <li key={each.key}>
                <Link href={each.href}>{each.key}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="h-12 flex items-center space-x-1 mx-2">
          <div className="w-12 h-full relative">
            <Image
              src="/firemoth-light.png"
              alt=""
              style={{ objectFit: "contain" }}
              fill
            />
          </div>
          <h1 className="text-xl w-28">
            {currentLang === "cn" ? "银河猫猫侠" : "FelysNeko"}
          </h1>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navigation.map((each) => (
            <li key={each.key} className="mx-1">
              <Link href={each.href}>{each.key}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <ChangeLangBtn currentLang={currentLang || "en"} />
      </div>
    </div>
  );
};

export default Navbar;
