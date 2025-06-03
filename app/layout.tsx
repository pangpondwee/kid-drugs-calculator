import type { Metadata } from "next";
import "./globals.css";
import { Sarabun } from "next/font/google";
import { Providers } from "@/components/providers";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "แอปพลิเคชันคำนวณขนาดยาน้ำในเด็ก",
  description: "ระบุน้ำหนักในหน่วย กิโลกรัม พร้อมกับเลือกชนิด/ความแรงของยา เพื่อคำนวณขนาดยาน้ำในเด็กเฉพาะราย",
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
    <html lang="th" suppressHydrationWarning>
      <body className={`${sarabun.variable} font-sans antialiased `}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
