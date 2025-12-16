import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { ChevronDown } from "lucide-react";

type Locale = "en" | "ar" | "ru" | "fr" | "ja" | "zh";

type Language = {
  code: Locale;
  label: string;
  name: string;
  country: string;
  rtl: boolean;
};

const languages: Language[] = [
  { code: "en", label: "EN", name: "English", country: "US", rtl: false },
  { code: "ar", label: "AR", name: "العربية", country: "SA", rtl: true },
  { code: "ru", label: "RU", name: "Русский", country: "RU", rtl: false },
  { code: "fr", label: "FR", name: "Français", country: "FR", rtl: false },
  { code: "ja", label: "JA", name: "日本語", country: "JP", rtl: false },
  { code: "zh", label: "ZH", name: "中文", country: "CN", rtl: false },
] as const;

const LanguageSelector: React.FC = () => {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = async (newLocale: Locale) => {
    try {
      setIsChanging(true);
      await setLocale(newLocale);
    } catch (error) {
      console.error("Failed to change language:", error);
    } finally {
      setIsChanging(false);
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
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

  // Close dropdown when pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2 text-sm font-medium
          bg-[#1c1c1c] text-white border border-gray-700
          rounded-md hover:bg-[#2a2a2a] transition-colors
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          ${isChanging ? "opacity-70" : ""}
        `}
        disabled={isChanging}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <span
          className={`fi fi-${currentLanguage.country.toLowerCase()} rounded-sm`}
          style={{ width: "20px", height: "15px" }}
          aria-hidden="true"
        />
        <span className="min-w-[24px] text-left">
          {isChanging ? "..." : currentLanguage.label}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-1 w-48 bg-[#1c1c1c] border border-gray-700 rounded-md shadow-xl z-50 overflow-hidden"
          style={{ direction: "ltr" }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={locale === lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`
                flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left
                transition-colors
                ${
                  locale === lang.code
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }
                focus:outline-none focus:bg-gray-700
              `}
              dir={lang.rtl ? "rtl" : "ltr"}
            >
              <span
                className={`fi fi-${lang.country.toLowerCase()} flex-shrink-0`}
                style={{ width: "20px", height: "15px" }}
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium">{lang.name}</div>
                <div className="text-xs text-gray-400">{lang.label}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
