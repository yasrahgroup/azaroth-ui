import "flag-icons/css/flag-icons.min.css";
import { useLanguage } from "../hooks/useLanguage";
import { Locale } from "../i18n/index";
import { useState, useRef, useEffect } from "react";

interface LanguageOption {
  code: Locale;
  countryCode: string;
  label: string;
  rtl?: boolean;
}

const LANGUAGE_OPTIONS = [
  { code: "en" as Locale, countryCode: "us", label: "English", rtl: false },
  { code: "ja" as Locale, countryCode: "jp", label: "日本語", rtl: false },
  { code: "zh" as Locale, countryCode: "cn", label: "中文", rtl: false },
  { code: "ar" as Locale, countryCode: "sa", label: "العربية", rtl: true }, 
  { code: "es" as Locale, countryCode: "es", label: "Español", rtl: false },
  { code: "de" as Locale, countryCode: "de", label: "Deutsch", rtl: false },
  { code: "fr" as Locale, countryCode: "fr", label: "Français", rtl: false },
  { code: "ru" as Locale, countryCode: "ru", label: "Русский", rtl: false }, 
] as const satisfies readonly LanguageOption[];

const LanguageDropdown = () => {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);

    const selectedLang = LANGUAGE_OPTIONS.find(
      (lang) => lang.code === newLocale
    );
    document.documentElement.dir = selectedLang?.rtl ? "rtl" : "ltr";
  };

  const currentLanguage =
    LANGUAGE_OPTIONS.find((lang) => lang.code === locale) ||
    LANGUAGE_OPTIONS[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 border border-gray-200 dark:border-gray-600 w-full md:w-auto shadow-sm hover:shadow-md"
      >
        {/* Flag icon */}
        <div className="relative w-6 h-6 overflow-hidden rounded-full shadow-sm ring-1 ring-gray-200 dark:ring-gray-600 flex-shrink-0">
          <span
            className={`fi fi-${currentLanguage.countryCode} w-full h-full block rounded-full`}
            style={{
              transformOrigin: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "24px",
              height: "24px",
              transform: "translate(-50%, -50%) scale(1.8)",
            }}
          ></span>
        </div>
        {/* Label always on right */}
        <span className="flex-grow text-left">{currentLanguage.label}</span>
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden transition-all duration-200 transform origin-top-right">
          <ul className="py-1">
            {LANGUAGE_OPTIONS.map((option: LanguageOption) => (
              <li key={option.code} className="w-full">
                <button
                  onClick={() => handleSelect(option.code)}
                  className={`w-full flex items-center gap-4 px-5 py-3 text-sm transition-all duration-200 ${
                    option.code === locale
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/70"
                  }`}
                >
                  {/* Flag always left */}
                  <div className="relative w-6 h-6 overflow-hidden rounded-full shadow-sm ring-1 ring-gray-200 dark:ring-gray-600 flex-shrink-0">
                    <span
                      className={`fi fi-${option.countryCode} w-full h-full block rounded-full`}
                      style={{
                        transformOrigin: "center",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "24px",
                        height: "24px",
                        transform: "translate(-50%, -50%) scale(1.8)",
                      }}
                    ></span>
                  </div>
                  {/* Label always right */}
                  <span className="flex-grow text-left">{option.label}</span>
                  {option.code === locale && (
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
