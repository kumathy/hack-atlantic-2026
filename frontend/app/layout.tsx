import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Nav from "@/components/nav";
import { DEMO_MODE } from "@/lib/demo-mode";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thorpe Watch",
  description:
    "Tracking truck strikes at the Bill Thorpe Walking Bridge overpass on Waterloo Row, Fredericton.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable}`}
      data-demo={DEMO_MODE ? "" : undefined}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-surface text-ink font-body">
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
