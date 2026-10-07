import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StartDialog from "@/components/StartDialog";
import BackToTop from "@/components/BackToTop";
const inter = Inter({ subsets: ["latin"], display: "swap" });
export const metadata: Metadata = {
  title: "Fermor — Make sense of your money",
  description: "Understand your finances, make better decisions, and build toward your goals with clarity.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <StartDialog />
        <BackToTop />
      </body>
    </html>
  );
}
