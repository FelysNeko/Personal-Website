import { Noto_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const notoSans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FelysNeko",
  description: "Home of FelysNeko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notoSans.className}>
      <body>
        <Navbar />
        <div className="mx-4 lg:mx-12">{children}</div>
        <section className="h-10" />
        <Footer />
      </body>
    </html>
  );
}
