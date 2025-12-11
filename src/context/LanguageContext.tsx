import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Locale, getTranslation } from "../i18n/index";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

export const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key: string) => key,
  isRTL: false,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<Locale>("en");
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Update document direction based on language
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [isRTL, locale]);

  const t = (key: string): string => {
    return getTranslation(locale, key);
  };

  const contextValue = {
    locale,
    setLocale: (newLocale: Locale) => {
      setLocale(newLocale);
      // Update RTL status based on language (Arabic is RTL, others are LTR)
      setIsRTL(newLocale === "ar");
    },
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
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
