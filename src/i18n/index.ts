export type Locale =
  | "en"
  | "fr"
  | "ar"
  | "it"
  | "de"
  | "es"
  | "zh"
  | "ja"
  | "ru";

// Import all translation files
import enTranslations from "../utils/translations/en";
import frTranslations from "../utils/translations/fr";
import arTranslations from "../utils/translations/ar";
import itTranslations from "../utils/translations/it";
import deTranslations from "../utils/translations/de";
import esTranslations from "../utils/translations/es";
import zhTranslations from "../utils/translations/zh";
import jaTranslations from "../utils/translations/ja";
import ruTranslations from "../utils/translations/ru";

// Map of all translations
export const translations: Record<Locale, Record<string, string>> = {
  en: enTranslations,
  fr: frTranslations,
  ar: arTranslations,
  it: itTranslations,
  de: deTranslations,
  es: esTranslations,
  zh: zhTranslations,
  ja: jaTranslations,
  ru: ruTranslations,
};
/**
 * Get translation for a key in the specified locale
 * @param locale - The locale to get the translation for
 * @param key - The translation key
 * @returns The translated string or the key if not found
 */
export const getTranslation = (locale: Locale, key: string): string => {
  // Try to get the translation for the current locale
  const translation = translations[locale]?.[key];

  // If translation doesn't exist, try English as fallback
  if (!translation && locale !== "en") {
    return translations.en?.[key] || key;
  }

  return translation || key; // Return key if no translation found
};
