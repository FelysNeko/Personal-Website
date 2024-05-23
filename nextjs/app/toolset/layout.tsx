import { getLangFromCookies } from "@/utils/cookies";
import ToolsetNav from "@/components/client/ToolsetNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = getLangFromCookies();

  return (
    <section className="min-h-screen pt-20">
      <ToolsetNav lang={lang}/>
      <div className="min-h-[calc(100vh-156px)] mt-4">{children}</div>
    </section>
  );
}
