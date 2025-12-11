import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/logo.png";

type Locale = "en" | "fr" | "ar" | "it" | "de" | "es" | "zh" | "ja" | "ru";

const languages: {
  code: Locale;
  name: string;
  flag: string;
  flagEmoji: string;
}[] = [
  { code: "en", name: "English", flag: "us", flagEmoji: "🇺🇸" },
  { code: "ar", name: "العربية", flag: "sa", flagEmoji: "🇸🇦" },
  { code: "de", name: "Deutsch", flag: "de", flagEmoji: "🇩🇪" },
  { code: "es", name: "Español", flag: "es", flagEmoji: "🇪🇸" },
  { code: "fr", name: "Français", flag: "fr", flagEmoji: "🇫🇷" },
  { code: "it", name: "Italiano", flag: "it", flagEmoji: "🇮🇹" },
  { code: "ja", name: "日本語", flag: "jp", flagEmoji: "🇯🇵" },
  { code: "ru", name: "Русский", flag: "ru", flagEmoji: "🇷🇺" },
  { code: "zh", name: "中文", flag: "cn", flagEmoji: "🇨🇳" },
];

const Header: React.FC = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const languageMenuRef = useRef<HTMLDivElement>(null);

  // Get the current language info
  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  const navItems = [
    { id: "home", label: t("nav.home"), path: "/" },
    { id: "about", label: t("nav.about"), path: "/about" },
    { id: "services", label: t("nav.services"), path: "/services" },
    { id: "testimonials", label: t("nav.testimonials"), path: "/testimonials" },
    { id: "contact", label: t("nav.contact"), path: "/contact" },
  ];

  // Close language dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get language name from translations
  // const getLanguageName = (code: string) => {
  //   return t(`language.${code}` as any) || code;
  // };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row - Language Selector */}
        <div className="h-10 flex items-center border-b border-gray-100">
          <div className="relative">
            <div className="relative" ref={languageMenuRef}>
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-150"
                aria-haspopup="true"
                aria-expanded={isLanguageOpen}
              >
                <span
                  className={`fi fi-${currentLanguage.flag} rounded mr-2`}
                ></span>
                <span className="font-medium">{currentLanguage.name}</span>
                <FiChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isLanguageOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {isLanguageOpen && (
                <div className="origin-top-left absolute left-0 mt-2 w-48 rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden transition-all duration-100 ease-in-out transform opacity-100 scale-100">
                  <div
                    className="py-1 max-h-60 overflow-auto"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLocale(lang.code);
                          // Save to localStorage for persistence
                          localStorage.setItem("i18nextLng", lang.code);
                          setIsLanguageOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 text-left text-sm ${
                          locale === lang.code
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className={`fi fi-${lang.flag} mr-2`}></span>
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Navigation Row */}
        <div className="flex items-center justify-between h-16">
          {/* Left - Company Name */}
          <div className="flex flex-col">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
              {t("AZAROTH TECH-HIVE")}
            </h1>
            <p className="text-xs font-medium tracking-wider bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
              CONSULTING SERVICES
            </p>
          </div>

          {/* Center - Navigation Items */}
          <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium uppercase tracking-wider"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right - Logo */}
          <div className="flex items-center space-x-4">
            <img
              src={logo}
              alt="Azaroth Logo"
              className="h-12 w-auto object-contain"
              style={{ minWidth: "120px" }}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
