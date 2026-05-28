import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "VibeHunt - Discover Trending Vibe Coding Apps",
  description: "Discover the most popular apps built with Vibe Coding platforms: Vercel, Lovable, Base44, and Youware. Track traffic trends and find inspiration for your next project.",
  keywords: ["vibe coding", "vercel", "lovable", "base44", "youware", "ai coding", "trending apps"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
