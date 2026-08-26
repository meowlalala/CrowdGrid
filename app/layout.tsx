import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CrowdGrid",
  description: "Secure access and event management for public and enterprise assemblies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-full flex flex-col font-sans bg-[#f9f9ff] text-[#001b3d]">
        <Header />
        {children}
        <MobileNav />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
