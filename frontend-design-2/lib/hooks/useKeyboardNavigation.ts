import { useEffect } from 'react';

export function useKeyboardNavigation(
  currentSlide: number,
  totalSlides: number,
  onPrev: () => void,
  onNext: () => void
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentSlide > 0) {
        onPrev();
      } else if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides, onPrev, onNext]);
}
