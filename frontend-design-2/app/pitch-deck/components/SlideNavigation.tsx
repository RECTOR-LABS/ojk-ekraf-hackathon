'use client';

import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFullscreen } from '@/lib/hooks/useFullscreen';

interface SlideNavigationProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onSlideClick: (index: number) => void;
}

export function SlideNavigation({
  current,
  total,
  onPrev,
  onNext,
  onSlideClick,
}: SlideNavigationProps) {
  const { isFullscreen, isSupported, toggleFullscreen } = useFullscreen();

  return (
    <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Arrow */}
        <button
          onClick={onPrev}
          disabled={current === 0}
          className={cn(
            'glass rounded-full p-3 sm:p-4 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center',
            current === 0
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:scale-110 hover:bg-purple-600/20'
          )}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Dot Indicators */}
          <div className="flex gap-1.5 sm:gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => onSlideClick(i)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === current
                    ? 'w-6 sm:w-8 bg-purple-500'
                    : 'w-2 bg-foreground/20 hover:bg-foreground/40'
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <span className="text-xs sm:text-sm text-foreground/60 font-mono min-w-[60px] text-center">
            {current + 1} / {total}
          </span>
        </div>

        {/* Control Buttons Group */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Fullscreen Toggle */}
          {isSupported && (
            <button
              onClick={toggleFullscreen}
              className="glass rounded-full p-3 sm:p-4 hover:scale-110 hover:bg-purple-600/20 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              title={isFullscreen ? 'Exit fullscreen (ESC)' : 'Enter fullscreen'}
            >
              {isFullscreen ? (
                <Minimize className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Maximize className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          )}

          {/* Right Arrow */}
          <button
            onClick={onNext}
            disabled={current === total - 1}
            className={cn(
              'glass rounded-full p-3 sm:p-4 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center',
              current === total - 1
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:scale-110 hover:bg-purple-600/20'
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
