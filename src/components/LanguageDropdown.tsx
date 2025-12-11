import "flag-icons/css/flag-icons.min.css";
import { useLanguage } from "../context/LanguageContext";
import { Locale } from "../i18n/index";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LanguageOption {
  code: Locale;
  countryCode: string;
  labelKey: string;
  rtl?: boolean;
}

const LANGUAGE_OPTIONS = [
  { code: "en", countryCode: "gb", labelKey: "language.en", rtl: false },
  { code: "de", countryCode: "de", labelKey: "language.de", rtl: false },
  { code: "fr", countryCode: "fr", labelKey: "language.fr", rtl: false },
  { code: "it", countryCode: "it", labelKey: "language.it", rtl: false },
  { code: "es", countryCode: "es", labelKey: "language.es", rtl: false },
  { code: "zh", countryCode: "cn", labelKey: "language.zh", rtl: false },
  { code: "ja", countryCode: "jp", labelKey: "language.ja", rtl: false },
  { code: "ar", countryCode: "sa", labelKey: "language.ar", rtl: true },
  { code: "ru", countryCode: "ru", labelKey: "language.ru", rtl: false },
] as const satisfies readonly LanguageOption[];

const LanguageDropdown = () => {
  const { locale, setLocale } = useLanguage();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Set initial document direction based on current locale
  useEffect(() => {
    const currentLang = LANGUAGE_OPTIONS.find((lang) => lang.code === locale);
    if (currentLang) {
      document.documentElement.dir = currentLang.rtl ? "rtl" : "ltr";
      document.documentElement.lang = locale;
    }
  }, [locale]);

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

  const handleSelect = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
    localStorage.setItem("i18nextLng", newLocale);

    const selectedLang = LANGUAGE_OPTIONS.find(
      (lang) => lang.code === newLocale
    );
    if (selectedLang) {
      document.documentElement.dir = selectedLang.rtl ? "rtl" : "ltr";
      document.documentElement.lang = newLocale;
    }
  };

  const currentLanguage: LanguageOption =
    LANGUAGE_OPTIONS.find((lang) => lang.code === locale) ??
    LANGUAGE_OPTIONS[0]!;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 border border-gray-200 dark:border-gray-600 w-full md:w-auto shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <div className="relative w-5 h-5 overflow-hidden rounded-full ring-1 ring-gray-300 dark:ring-gray-600 flex-shrink-0">
          <span
            className={`fi fi-${currentLanguage.countryCode} block w-full h-full`}
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
        <span
          className="flex-grow text-left ml-2"
          dir={currentLanguage.rtl ? "rtl" : "ltr"}
        >
          {t(currentLanguage.labelKey)}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden"
          role="listbox"
          aria-label="Language options"
        >
          <div className="py-1 max-h-60 overflow-auto">
            {LANGUAGE_OPTIONS.map((language) => (
              <button
                key={language.code}
                onClick={() => handleSelect(language.code)}
                role="option"
                aria-selected={locale === language.code}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 ${
                  locale === language.code
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                } transition-colors duration-150 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700`}
              >
                <div className="relative w-5 h-5 overflow-hidden rounded-full ring-1 ring-gray-300 dark:ring-gray-600 flex-shrink-0">
                  <span
                    className={`fi fi-${language.countryCode} block w-full h-full`}
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
                <span className="ml-2" dir={language.rtl ? "rtl" : "ltr"}>
                  {t(language.labelKey)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
