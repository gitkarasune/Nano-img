import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nano Banana - AI Image Generator",
  description: "Generate stunning images with Nano Banana, the AI-powered image generator. Create unique visuals effortlessly.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body
        className={` bg-black dark:bg-white text-white dark:text-black ${inter.className} `}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
