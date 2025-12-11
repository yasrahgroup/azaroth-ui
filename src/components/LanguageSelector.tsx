import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Locale } from "../i18n/index";
import { ChevronDown } from "lucide-react";
import "flag-icons/css/flag-icons.min.css";

// List of supported languages with their properties
const languageOptions = [
  { code: "en" as Locale, name: "English", flag: "gb", rtl: false },
  { code: "de" as Locale, name: "Deutsch", flag: "de", rtl: false },
  { code: "fr" as Locale, name: "Français", flag: "fr", rtl: false },
  { code: "it" as Locale, name: "Italiano", flag: "it", rtl: false },
  { code: "es" as Locale, name: "Español", flag: "es", rtl: false },
  { code: "zh" as Locale, name: "中文", flag: "cn", rtl: false },
  { code: "ja" as Locale, name: "日本語", flag: "jp", rtl: false },
  { code: "ar" as Locale, name: "العربية", flag: "sa", rtl: true },
  { code: "ru" as Locale, name: "Русский", flag: "ru", rtl: false },
];

const LanguageSelector: React.FC = () => {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguage =
    languageOptions.find((lang) => lang.code === locale) || languageOptions[0];

  const handleLanguageChange = (langCode: Locale) => {
    setLocale(langCode);
    setIsOpen(false);
    localStorage.setItem("i18nextLng", langCode);

    // Update document direction for RTL support
    const selectedLang = languageOptions.find((lang) => lang.code === langCode);
    if (selectedLang) {
      document.documentElement.dir = selectedLang.rtl ? "rtl" : "ltr";
      document.documentElement.lang = langCode;

      // Force a re-render of the app to apply language changes
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <div className="relative w-5 h-5 overflow-hidden rounded-full ring-1 ring-gray-300 dark:ring-gray-600 flex-shrink-0">
          <span
            className={`fi fi-${selectedLanguage.flag} block w-full h-full`}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "20px",
              height: "20px",
              transform: "translate(-50%, -50%) scale(1.5)",
              transformOrigin: "center",
            }}
          />
        </div>
        <span className="ml-2" dir={selectedLanguage.rtl ? "rtl" : "ltr"}>
          {selectedLanguage.name}
        </span>
        <ChevronDown
          className={`ml-2 h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 overflow-hidden"
          role="listbox"
          aria-label="Language options"
        >
          <div className="py-1">
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                role="option"
                aria-selected={locale === lang.code}
                className={`${
                  locale === lang.code
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                } flex items-center w-full px-4 py-2 text-sm focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 transition-colors duration-150`}
              >
                <div className="relative w-5 h-5 overflow-hidden rounded-full ring-1 ring-gray-300 dark:ring-gray-600 flex-shrink-0">
                  <span
                    className={`fi fi-${lang.flag} block w-full h-full`}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "20px",
                      height: "20px",
                      transform: "translate(-50%, -50%) scale(1.5)",
                      transformOrigin: "center",
                    }}
                  />
                </div>
                <span className="ml-3" dir={lang.rtl ? "rtl" : "ltr"}>
                  {lang.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
