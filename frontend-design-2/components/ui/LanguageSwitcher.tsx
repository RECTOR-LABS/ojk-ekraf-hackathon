'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getLocale, setLocale, type Locale } from '@/lib/i18n';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('id');

  useEffect(() => {
    setCurrentLocale(getLocale());
  }, []);

  const toggleLocale = () => {
    const newLocale: Locale = currentLocale === 'id' ? 'en' : 'id';
    setLocale(newLocale);
    setCurrentLocale(newLocale);

    // Dispatch custom event for LocaleProvider to react
    window.dispatchEvent(
      new CustomEvent('localeChange', {
        detail: { locale: newLocale },
      })
    );
  };

  return (
    <button
      onClick={toggleLocale}
      className="relative flex items-center gap-2 px-4 py-2 rounded-xl glass border border-foreground/10 hover:border-purple-500/50 transition-all group"
      aria-label="Toggle language"
    >
      {/* Icon */}
      <Languages className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />

      {/* Language Toggle */}
      <div className="flex items-center gap-1">
        <motion.span
          className={`text-sm font-semibold transition-colors ${
            currentLocale === 'id'
              ? 'text-foreground'
              : 'text-foreground/40'
          }`}
          animate={{
            scale: currentLocale === 'id' ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          ID
        </motion.span>

        <span className="text-foreground/40 text-sm">/</span>

        <motion.span
          className={`text-sm font-semibold transition-colors ${
            currentLocale === 'en'
              ? 'text-foreground'
              : 'text-foreground/40'
          }`}
          animate={{
            scale: currentLocale === 'en' ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          EN
        </motion.span>
      </div>

      {/* Active indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
        initial={false}
        animate={{
          width: currentLocale === 'id' ? '50%' : '50%',
          x: currentLocale === 'id' ? 0 : '100%',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-purple-600/0 group-hover:bg-purple-600/10 transition-colors" />
    </button>
  );
}
