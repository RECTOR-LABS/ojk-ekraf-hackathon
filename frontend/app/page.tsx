import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { ForIndonesianCreatorsSection } from '@/components/landing/ForIndonesianCreatorsSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <ForIndonesianCreatorsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
