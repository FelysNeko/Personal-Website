"use client";
import { usePathname } from "next/navigation";
import { TOOLSET as EN } from "@/constant/en";
import { TOOLSET as CN } from "@/constant/cn";
import { capitalize } from "@/utils/general";
import Link from "next/link";

interface Props {
  lang: string;
}

const ToolsetNav = ({ lang }: Props) => {
  const toolset = lang === "中" ? CN : EN;
  const path = usePathname();

  console.log(path);

  return (
    <div role="tablist" className="tabs tabs-bordered">
      {toolset.map((proj) => (
        <Link
          key={proj.key}
          href={proj.href}
          role="tab"
          className={`tab overflow-hidden ${
            path === proj.href ? "tab-active" : ""
          }`}
        >
          {capitalize(proj.key)}
        </Link>
      ))}
    </div>
  );
};

export default ToolsetNav;
