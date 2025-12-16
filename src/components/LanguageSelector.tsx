import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "en", label: "EN", country: "GB", rtl: false },
  { code: "ar", label: "AR", country: "SA", rtl: true },
  { code: "ru", label: "RU", country: "RU", rtl: false },
  { code: "fr", label: "FR", country: "FR", rtl: false },
  { code: "ja", label: "JA", country: "JP", rtl: false },
  { code: "zh", label: "ZH", country: "CN", rtl: false },
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
        className="flex items-center gap-2 px-3 py-1.5 text-sm
                   bg-[#1c1c1c] text-white border border-gray-700
                   rounded-md hover:bg-[#2a2a2a]"
      >
        <span
          className={`fi fi-${current.country.toLowerCase()}`}
          style={{ width: "20px", height: "14px" }}
        />
        <span>{current.label}</span>
        <ChevronDown size={14} className={open ? "rotate-180" : ""} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-24 bg-[#1c1c1c] border border-gray-700 rounded-md shadow-xl z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm
                ${
                  i18n.language === lang.code
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
            >
              <span
                className={`fi fi-${lang.country.toLowerCase()}`}
                style={{ width: "20px", height: "14px" }}
              />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
