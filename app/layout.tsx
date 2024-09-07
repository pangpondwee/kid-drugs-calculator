import type { Metadata } from "next";
import "./globals.css";
import { Sarabun } from "next/font/google";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "โปรแกรมคำนวณคำนวณขนาดยาน้ำเด็ก",
};

const sarabun = Sarabun({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sarabun",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sarabun.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
