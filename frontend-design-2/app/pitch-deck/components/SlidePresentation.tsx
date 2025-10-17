'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideNavigation } from './SlideNavigation';
import { useKeyboardNavigation } from '@/lib/hooks/useKeyboardNavigation';

// Import all slide components
import { Slide01Cover } from './slides/Slide01Cover';
import { Slide02Problem } from './slides/Slide02Problem';
import { Slide03Solution } from './slides/Slide03Solution';
import { Slide04HowItWorks } from './slides/Slide04HowItWorks';
import { Slide05Registration } from './slides/Slide05Registration';
import { Slide06Dashboard } from './slides/Slide06Dashboard';
import { Slide07Mint } from './slides/Slide07Mint';
import { Slide08Marketplace } from './slides/Slide08Marketplace';
import { Slide09Technical } from './slides/Slide09Technical';
import { Slide10Security } from './slides/Slide10Security';
import { Slide11Innovation } from './slides/Slide11Innovation';
import { Slide12Business } from './slides/Slide12Business';
import { Slide13Roadmap } from './slides/Slide13Roadmap';
import { Slide14Impact } from './slides/Slide14Impact';
import { Slide15CTA } from './slides/Slide15CTA';

const TOTAL_SLIDES = 15;

const slides = [
  Slide01Cover,
  Slide02Problem,
  Slide03Solution,
  Slide04HowItWorks,
  Slide05Registration,
  Slide06Dashboard,
  Slide07Mint,
  Slide08Marketplace,
  Slide09Technical,
  Slide10Security,
  Slide11Innovation,
  Slide12Business,
  Slide13Roadmap,
  Slide14Impact,
  Slide15CTA,
];

export function SlidePresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => setCurrentSlide((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setCurrentSlide((prev) => Math.min(TOTAL_SLIDES - 1, prev + 1));
  const handleSlideClick = (index: number) => setCurrentSlide(index);

  // Keyboard navigation
  useKeyboardNavigation(currentSlide, TOTAL_SLIDES, handlePrev, handleNext);

  return (
    <section id="slides" className="relative bg-background">
      {/* Slide Container */}
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${currentSlide * 100}%` }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        >
          {slides.map((SlideComponent, index) => (
            <SlideComponent key={index} />
          ))}
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <SlideNavigation
        current={currentSlide}
        total={TOTAL_SLIDES}
        onPrev={handlePrev}
        onNext={handleNext}
        onSlideClick={handleSlideClick}
      />
    </section>
  );
}
