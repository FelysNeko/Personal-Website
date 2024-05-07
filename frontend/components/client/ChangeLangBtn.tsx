"use client";
import { setLangCookie } from "@/app/actions";

interface Props {
  lang: string;
}

const ChangeLangBtn = ({ lang }: Props) => {
  return (
    <button
      className="btn me-3"
      onClick={() => setLangCookie(lang === "en" ? "中" : "en")}
    >
      {(lang === "en" ? "中" : "en").toUpperCase()}
    </button>
  );
};

export default ChangeLangBtn;
