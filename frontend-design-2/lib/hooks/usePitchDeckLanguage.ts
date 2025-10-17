'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'id';

interface PitchDeckLanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const usePitchDeckLanguage = create<PitchDeckLanguageStore>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () =>
        set((state) => ({ language: state.language === 'en' ? 'id' : 'en' })),
    }),
    {
      name: 'pitch-deck-language',
    }
  )
);
