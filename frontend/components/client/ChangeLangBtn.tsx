"use client";
import { setLangCookie } from "@/app/actions";

interface Props {
  currentLang: string;
}

const ChangeLangBtn = ({ currentLang }: Props) => {
  return (
    <button
      className="btn"
      onClick={() => setLangCookie(currentLang === "en" ? "cn" : "en")}
    >
      {(currentLang === "en" ? "cn" : "en").toUpperCase()}
    </button>
  );
};

export default ChangeLangBtn;
