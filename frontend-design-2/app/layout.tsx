import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'KaryaChain - Decentralized Copyright Protection',
  description:
    'Protect your creative works on blockchain. Register copyright, mint NFTs, and earn perpetual royalties on KaryaChain.',
  keywords: [
    'blockchain',
    'copyright',
    'NFT',
    'Indonesia',
    'creative economy',
    'royalties',
    'IPFS',
    'Ethereum',
  ],
  authors: [{ name: 'RECTOR' }],
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  themeColor: '#9333ea',
  openGraph: {
    title: 'KaryaChain - Decentralized Copyright Protection',
    description: 'Protect your creative works on blockchain with tamper-proof copyright registration.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
