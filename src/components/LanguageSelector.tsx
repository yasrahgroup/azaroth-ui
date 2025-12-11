import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Locale } from "../i18n/index";
import { ChevronDown } from "lucide-react";
import i18n from "i18next";

const languageOptions = [
  { code: "en" as Locale, name: "English", flag: "us" },
  { code: "es" as Locale, name: "Español", flag: "es" },
  { code: "fr" as Locale, name: "Français", flag: "fr" },
  { code: "de" as Locale, name: "Deutsch", flag: "de" },
  { code: "zh" as Locale, name: "中文", flag: "cn" },
  { code: "ja" as Locale, name: "日本語", flag: "jp" },
  { code: "ar" as Locale, name: "العربية", flag: "sa" },
  { code: "ru" as Locale, name: "Русский", flag: "ru" },
];

const LanguageSelector: React.FC = () => {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguage =
    languageOptions.find((lang) => lang.code === locale) || languageOptions[0];

  const handleLanguageChange = async (langCode: Locale) => {
    try {
      // Update i18next
      await i18n.changeLanguage(langCode);

      // Update context
      setLocale(langCode);

      // Close dropdown
      setIsOpen(false);

      // Save to localStorage
      localStorage.setItem("i18nextLng", langCode);
    } catch (error) {
      console.error("Error changing language:", error);
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="language-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`fi fi-${selectedLanguage.flag} mr-2`}></span>
          {selectedLanguage.name}
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div
            className="py-1 max-h-[unset] overflow-visible"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="language-menu"
          >
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`${
                  locale === lang.code
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                } group flex items-center w-full px-4 py-2 text-sm`}
                role="menuitem"
              >
                <span className={`fi fi-${lang.flag} mr-3`}></span>
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
