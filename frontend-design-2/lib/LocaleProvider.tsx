'use client';

import { ReactNode, useState, useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, defaultLocale, type Locale } from './i18n';
import idMessages from '../messages/id.json';
import enMessages from '../messages/en.json';

interface LocaleProviderProps {
  children: ReactNode;
}

const messagesMap = {
  id: idMessages,
  en: enMessages,
};

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<any>(messagesMap[defaultLocale]);
  const [isLoading, setIsLoading] = useState(true);

  // Load locale and messages on mount
  useEffect(() => {
    const currentLocale = getLocale();
    setLocaleState(currentLocale);
    setMessages(messagesMap[currentLocale]);
    setIsLoading(false);
  }, []);

  // Listen for locale changes from localStorage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'locale' && e.newValue) {
        const newLocale = e.newValue as Locale;
        setLocaleState(newLocale);
        setMessages(messagesMap[newLocale]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Also listen for custom event for same-tab changes
  useEffect(() => {
    const handleLocaleChange = (e: CustomEvent<{ locale: Locale }>) => {
      const newLocale = e.detail.locale;
      setLocaleState(newLocale);
      setMessages(messagesMap[newLocale]);
    };

    window.addEventListener('localeChange' as any, handleLocaleChange);
    return () => window.removeEventListener('localeChange' as any, handleLocaleChange);
  }, []);

  if (isLoading || !messages) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
