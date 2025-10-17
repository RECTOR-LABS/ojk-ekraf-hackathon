import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KaryaChain Pitch Deck | OJK-Ekraf Hackathon 2025',
  description: 'Blockchain-powered copyright protection for Indonesian creators',
  openGraph: {
    title: 'KaryaChain Pitch Deck',
    description: 'Blockchain-powered copyright protection for Indonesian creators',
    type: 'website',
  },
};

export default function PitchDeckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
