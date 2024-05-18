"use server";
import { cookies } from "next/headers";

export const setLangCookie = async (lang: string) => {
  cookies().set("lang", lang);
};