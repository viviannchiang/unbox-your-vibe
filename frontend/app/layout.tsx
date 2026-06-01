import type { Metadata } from "next";
import { Quicksand, DM_Sans } from "next/font/google";
import { Nav } from "@/components/Nav";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "unbox your vibe",
  description: "take the quiz. tear open the box. meet your figure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${dmSans.variable} font-body bg-background text-text antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
