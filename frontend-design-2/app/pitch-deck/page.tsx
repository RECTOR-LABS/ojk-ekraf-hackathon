'use client';

import { PitchDeckHero } from './components/PitchDeckHero';
import { SlidePresentation } from './components/SlidePresentation';
import { DemoVideoSection } from './components/DemoVideoSection';
import { DocumentsTab } from './components/DocumentsTab';
import { TabContainer } from './components/TabContainer';
import { LanguageToggle } from './components/LanguageToggle';

// Note: Metadata must be exported from a separate layout.tsx or metadata.ts file
// since this is a 'use client' component. See: app/pitch-deck/layout.tsx

export default function PitchDeckPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Language Toggle (Floating) */}
      <LanguageToggle />

      {/* Hero Section */}
      <PitchDeckHero />

      {/* Tabbed Content */}
      <TabContainer
        slidesContent={<SlidePresentation />}
        videoContent={<DemoVideoSection />}
        documentsContent={<DocumentsTab />}
      />
    </div>
  );
}
