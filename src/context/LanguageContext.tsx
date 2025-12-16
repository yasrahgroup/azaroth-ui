import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useContext,
} from "react";
import i18n, { isRTL as checkRTL } from "../i18n";
import { TFunction } from "i18next";

type Locale = "en" | "ar" | "ru" | "fr" | "ja" | "zh";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => Promise<void>;
  t: TFunction;
  isRTL: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locale, setLocaleState] = useState<Locale>(
    (i18n.language as Locale) || "en"
  );
  const [isRTL, setIsRTL] = useState(checkRTL(i18n.language));
  const [t, setT] = useState<TFunction>(() => i18n.t.bind(i18n));

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      const languageCode = lng.split("-")[0] as Locale;
      setLocaleState(languageCode);
      setIsRTL(checkRTL(languageCode));
      setT(() => i18n.t.bind(i18n));
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  const setLocale = useCallback(async (newLocale: Locale) => {
    await i18n.changeLanguage(newLocale);
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
