import type { Metadata } from "next";
import localFont from "next/font/local";
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ClerkProvider } from "@/components/clerk-provider"
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "DockingLabs",
  description: "Molecular Docking Research Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <div className="flex h-screen w-screen">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-6">
                  {children}
                </main>
              </div>
            </SidebarProvider>
          </ThemeProvider>
      </body>
    </html>
        </ClerkProvider>
  )
}
