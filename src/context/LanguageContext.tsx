import React, { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import i18n, { isRTL as checkRTL } from "../i18n";
import { TFunction } from "i18next";

type Locale = 'en' | 'ar' | 'ru' | 'fr' | 'ja' | 'zh';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => Promise<void>;
  t: TFunction;
  isRTL: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>((i18n.language as Locale) || 'en');
  const [isRTL, setIsRTL] = useState(checkRTL(i18n.language));
  const [t, setT] = useState<TFunction>(() => i18n.t.bind(i18n));

  // Update RTL status and t function when language changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      const languageCode = lng.split('-')[0] as Locale;
      setLocaleState(languageCode);
      setIsRTL(checkRTL(languageCode));
      setT(() => i18n.t.bind(i18n));
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const setLocale = useCallback(async (newLocale: Locale) => {
    await i18n.changeLanguage(newLocale);
  }, []);

  const contextValue = {
    locale,
    setLocale,
    t,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};