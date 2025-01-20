import { Metadata } from "next";
import { Toaster } from "sonner";

import { Navbar } from "@/components/custom/navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "OrderWise",
  description: "OrderWise",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Toaster position="top-center" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
