import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./navbar/navbar";

// 定義 Geist Sans 和 Geist Mono 字型
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});



export const metadata: Metadata = {
  title: "Youtube",
  description: "Youtube-Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.variable}> {/* 使用 geistSans */}
        <NavBar />
        {children}
      </body>
    </html>
  );
}
