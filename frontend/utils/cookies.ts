import { cookies } from "next/headers";

export const getLangFromCookies = () => cookies().get("lang")?.value || "en";
