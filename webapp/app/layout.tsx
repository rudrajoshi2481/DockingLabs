"use client";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Appbar from "@/components/Appbar/Appbar";
import { Separator } from "@/components/ui/separator";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import Provider from "./provider";
import NextTopLoader from 'nextjs-toploader';
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <SessionProvider>
        <body className={poppins.className}>
        <NextTopLoader />
          <Provider>
            <Toaster />
            <Appbar />

            {children}
          </Provider>
        </body>
      </SessionProvider>
    </html>
  );
}
