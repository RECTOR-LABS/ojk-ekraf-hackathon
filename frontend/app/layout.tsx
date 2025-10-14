import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { NetworkChecker } from "@/components/web3/NetworkChecker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karya Chain - Blockchain Copyright Protection for Indonesian Creators",
  description: "Protect your creative work with blockchain. Instant copyright registration and lifetime royalties for Indonesian artists, musicians, photographers, and designers.",
  keywords: ["blockchain", "copyright", "NFT", "Indonesia", "creative economy", "EKRAF", "intellectual property"],
  authors: [{ name: "Karya Chain Team" }],
  openGraph: {
    title: "Karya Chain - Blockchain Copyright Protection",
    description: "Indonesia's first platform for creator IP protection with automated royalties",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Providers>
          <NetworkChecker />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
