import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hack Atlantic 2026",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
