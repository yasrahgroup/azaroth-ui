import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
import en from "./locales/en.json";
import ar from "./locales/ar.json";
import ru from "./locales/ru.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
import zh from "./locales/zh.json";

// Type for translation keys
export type TranslationKey = keyof typeof en;

const resources = {
  en: { translation: en },
  ar: { translation: ar },
  ru: { translation: ru },
  fr: { translation: fr },
  ja: { translation: ja },
  zh: { translation: zh },
} as const;

// RTL languages
const rtlLanguages = ["ar"];

// Function to check if language is RTL
const isRTL = (lang: string) => rtlLanguages.includes(lang);

// Function to get text direction
const getDirection = (lang: string) => (isRTL(lang) ? "rtl" : "ltr");

// Set initial language from localStorage or browser
const savedLanguage = localStorage.getItem("i18nextLng");
const initialLanguage = savedLanguage || navigator.language.split("-")[0];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: "en",
    supportedLngs: Object.keys(resources),
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    react: {
      useSuspense: false,
    },
  });

// Set initial direction
document.documentElement.dir = getDirection(initialLanguage);
document.documentElement.lang = initialLanguage;

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
