import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Supported languages
const supportedLngs = ["en", "ar", "ru", "fr", "ja", "zh"] as const;
type LanguageCode = (typeof supportedLngs)[number];

// RTL languages
const rtlLanguages = new Set<LanguageCode>(["ar"]);

// Function to check if language is RTL
export const isRTL = (lang: string): boolean =>
  rtlLanguages.has(lang as LanguageCode);

// Function to get text direction
export const getDirection = (lang: string): "rtl" | "ltr" =>
  isRTL(lang) ? "rtl" : "ltr";

// Type for translation keys
declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: typeof import("../public/locales/en/translation.json");
    };
  }
}

export type TranslationKey =
  keyof typeof import("../public/locales/en/translation.json");

// Set initial language from localStorage or browser
const savedLanguage = localStorage.getItem("i18nextLng");
const initialLanguage =
  savedLanguage || navigator.language.split("-")[0] || "en";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: initialLanguage,
    fallbackLng: "en",
    supportedLngs: [...supportedLngs],
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    react: {
      useSuspense: false,
    },
  });

// Set initial direction on page load
document.documentElement.lang = initialLanguage;
document.documentElement.dir = getDirection(initialLanguage);

// Update direction and lang attribute when language changes
i18n.on("languageChanged", (lng) => {
  const languageCode = lng.split("-")[0];
  const direction = getDirection(languageCode);

  document.documentElement.dir = direction;
  document.documentElement.lang = languageCode;

  // Add/remove RTL class to body if needed
  if (isRTL(languageCode)) {
    document.body.classList.add("rtl");
  } else {
    document.body.classList.remove("rtl");
  }

  // Save to localStorage
  localStorage.setItem("i18nextLng", languageCode);
});

export default i18n;
