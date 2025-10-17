'use client';

import { motion } from 'framer-motion';
import { usePitchDeckLanguage } from '@/lib/hooks/usePitchDeckLanguage';
import { cn } from '@/lib/utils';

export function LanguageToggle() {
  const { language, setLanguage } = usePitchDeckLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="fixed top-24 left-4 sm:left-6 z-50 glass rounded-full p-1 flex items-center gap-1"
    >
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          'px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px] flex items-center justify-center',
          language === 'en'
            ? 'bg-purple-600 text-white'
            : 'text-foreground/60 hover:text-foreground/90'
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('id')}
        className={cn(
          'px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px] flex items-center justify-center',
          language === 'id'
            ? 'bg-purple-600 text-white'
            : 'text-foreground/60 hover:text-foreground/90'
        )}
        aria-label="Ganti ke Bahasa Indonesia"
      >
        ID
      </button>
    </motion.div>
  );
}
