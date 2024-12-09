import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI姓名缘分测试 - 探索你们的缘分密码",
  description: "基于AI技术的姓名缘分测试，通过分析姓名的五行属性、字符能量等维度，为您提供专业的缘分分析。",
  keywords: "姓名测试,缘分测试,AI测试,姓名分析,缘分分析",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "AI姓名缘分测试 - 探索你们的缘分密码",
    description: "基于AI技术的姓名缘分测试，专业分析两个人的缘分契合度。",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
