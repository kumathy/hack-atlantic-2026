import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import Nav from "@/components/nav";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Overpass Watch",
  description:
    "Days since a truck last hit the overpass. The bridge is undefeated.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${nunito.variable}`}>
      <body className="min-h-screen bg-[#fef3e8] text-[#3d2314] font-body">
        <Nav />
        {children}
      </body>
    </html>
  );
}
