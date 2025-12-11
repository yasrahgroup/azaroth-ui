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
  // Always default to English
  const [locale, setLocaleState] = useState<Locale>("en");
  const [isRTL, setIsRTL] = useState(false);

  // Update document when component mounts or locale changes
  useEffect(() => {
    // Force English as default
    setLocale("en");

    // Update document attributes
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  }, []);

  const t = (key: string): string => {
    return getTranslation(locale, key);
  };

  const setLocale = (newLocale: Locale) => {
    // Use the selected language, defaulting to English if not provided
    const finalLocale = newLocale || "en";
    setLocaleState(finalLocale);

    // Handle RTL for Arabic
    const isRTL = finalLocale === "ar";
    setIsRTL(isRTL);

    // Update document attributes
    document.documentElement.lang = finalLocale;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  };

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
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
