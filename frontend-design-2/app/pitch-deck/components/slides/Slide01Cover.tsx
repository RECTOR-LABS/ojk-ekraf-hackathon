'use client';

import { SlideContent } from '../SlideContent';
import { usePitchDeckLanguage } from '@/lib/hooks/usePitchDeckLanguage';
import Image from 'next/image';

export function Slide01Cover() {
  const { language } = usePitchDeckLanguage();

  const content = {
    en: {
      subtitle: 'Blockchain-Powered Copyright Protection',
      forCreators: 'for Indonesian Creators',
      hackathon: 'OJK-Ekraf Infinity Hackathon 2025',
      category: 'Digital Rights & Authentication',
      team: 'Team: RECTOR',
    },
    id: {
      subtitle: 'Perlindungan Hak Cipta Berbasis Blockchain',
      forCreators: 'untuk Kreator Indonesia',
      hackathon: 'OJK-Ekraf Infinity Hackathon 2025',
      category: 'Hak Digital & Autentikasi',
      team: 'Tim: RECTOR',
    },
  };

  const t = content[language];

  return (
    <SlideContent>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pitch-deck/01-landing-page-hero.png"
          alt="KaryaChain Landing Page"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 sm:space-y-8">
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold">
          Karya<span className="gradient-text">Chain</span>
        </h1>

        <div className="space-y-4">
          <p className="text-2xl sm:text-3xl lg:text-4xl text-foreground/90 font-semibold">
            {t.subtitle}
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl text-foreground/70">
            {t.forCreators}
          </p>
        </div>

        <div className="pt-8 space-y-3 text-sm sm:text-base text-foreground/60">
          <p className="font-semibold text-foreground/80">
            {t.hackathon}
          </p>
          <p>{t.category}</p>
          <p className="font-mono text-purple-400 text-base sm:text-lg">
            karyachain.rectorspace.com
          </p>
          <p className="text-foreground/50">{t.team}</p>
        </div>
      </div>
    </SlideContent>
  );
}
