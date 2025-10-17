'use client';

import { useRef } from 'react';
import { PitchDeckHero } from './components/PitchDeckHero';
import { SlidePresentation } from './components/SlidePresentation';
import { DemoVideoSection } from './components/DemoVideoSection';
import { PDFDownloadButton } from './components/PDFDownloadButton';

// Note: Metadata must be exported from a separate layout.tsx or metadata.ts file
// since this is a 'use client' component. See: app/pitch-deck/layout.tsx

export default function PitchDeckPage() {
  const slidesRef = useRef<HTMLDivElement>(null);

  const scrollToSlides = () => {
    slidesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <PitchDeckHero onStartClick={scrollToSlides} />

      {/* Slide Presentation */}
      <div ref={slidesRef}>
        <SlidePresentation />
      </div>

      {/* Demo Video Section */}
      <DemoVideoSection />

      {/* PDF Download Button (Floating) */}
      <PDFDownloadButton />
    </div>
  );
}
