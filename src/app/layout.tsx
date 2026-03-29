import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Manpreet Singh | Backend Architect & AI Researcher",
  description: "Portfolio of Manpreet Singh, a Full-stack Developer specialized in Backend systems and Generative AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
