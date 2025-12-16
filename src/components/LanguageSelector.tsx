import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "en", label: "EN", name: "English", country: "US", rtl: false },
  { code: "ar", label: "AR", name: "العربية", country: "SA", rtl: true },
  { code: "ru", label: "RU", name: "Русский", country: "RU", rtl: false },
  { code: "fr", label: "FR", name: "Français", country: "FR", rtl: false },
  { code: "ja", label: "JA", name: "日本語", country: "JP", rtl: false },
  { code: "zh", label: "ZH", name: "中文", country: "CN", rtl: false },
] as const;

type LangCode = (typeof languages)[number]["code"];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (code: LangCode) => {
    const selected = languages.find((l) => l.code === code)!;
    i18n.changeLanguage(code);
    document.documentElement.lang = code;
    document.documentElement.dir = selected.rtl ? "rtl" : "ltr";
    setOpen(false);
  };

  useEffect(() => {
    const close = (e: MouseEvent) =>
      ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium
                   bg-[#1c1c1c] text-white border border-gray-700
                   rounded-md hover:bg-[#2a2a2a] transition-colors"
        aria-label="Select language"
      >
        <span
          className={`fi fi-${current.country.toLowerCase()} rounded-sm`}
          style={{ width: "20px", height: "15px" }}
        />
        <span className="min-w-[24px] text-left">{current.label}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-1 w-48 bg-[#1c1c1c] border border-gray-700 rounded-md shadow-xl z-50 overflow-hidden"
          style={{ direction: "ltr" }} // Force LTR for consistent dropdown layout
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left
                transition-colors ${
                  i18n.language === lang.code
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              dir={lang.rtl ? "rtl" : "ltr"}
            >
              <span
                className={`fi fi-${lang.country.toLowerCase()} flex-shrink-0`}
                style={{ width: "20px", height: "15px" }}
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
