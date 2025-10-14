import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';

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
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* TopBar */}
              <TopBar />

              {/* Page Content */}
              <main className="flex-1 p-6 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
