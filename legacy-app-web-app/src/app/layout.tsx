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
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider as CustomThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });
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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <SessionProvider>
          <body className={poppins.className}>
          <NextTopLoader />
            <Provider>
              <Toaster />
              <Appbar />
              <CustomThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </CustomThemeProvider>
            </Provider>
          </body>
        </SessionProvider>
      </html>
    </ClerkProvider>
  );
}
