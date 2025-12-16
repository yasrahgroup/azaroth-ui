import React, { useState, useRef, useEffect, FC } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown, FiX, FiMenu } from "react-icons/fi";
// Theme related imports (commented out for future use)
// import { FiSun, FiMoon } from "react-icons/fi";
// import { useTheme } from "../hooks/useTheme";
import Logo from "./Logo";

interface NavItemProps {
  href: string;
  text: string;
  dropdownItems?: Array<{
    href: string;
    text: string;
    isHighlighted?: boolean;
  }>;
}

const NavItem: FC<NavItemProps> = ({ href, text, dropdownItems }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isRTL = useRef(document.documentElement.dir === "rtl");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsHovered(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (dropdownItems) {
    return (
      <div
        className="relative"
        ref={dropdownRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className={`flex items-center text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            isHovered ? "text-blue-600" : ""
          }`}
          aria-expanded={isHovered}
          aria-haspopup="true"
        >
          {text}
          <FiChevronDown
            className={`ml-1 transition-transform duration-200 ${
              isHovered ? "transform rotate-180" : ""
            }`}
            size={16}
          />
        </button>
        {isHovered && (
          <div
            className={`absolute ${
              isRTL.current ? "right-0" : "left-0"
            } mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1">
              {dropdownItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`block px-4 py-2 text-sm ${
                    item.isHighlighted
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  role="menuitem"
                >
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={href}
      className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors duration-200"
    >
      {text}
    </a>
  );
};

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  // Theme related code (commented out for future use)
  // const { theme, toggleTheme } = useTheme();
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const contactDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close contact dropdown
      if (
        contactDropdownRef.current &&
        !contactDropdownRef.current.contains(event.target as Node)
      ) {
        setIsContactDropdownOpen(false);
      }
      // Close language dropdown
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false);
      }
      // Close mobile menu
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(
          'button[aria-label="Open main menu"]'
        )
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // RTL layout class
  // const flexDirectionClass = isRTL ? "flex-row-reverse" : "flex-row";

  const languages = [
    { code: "en", name: "English", flag: "us" },
    { code: "ar", name: "العربية", flag: "sa" },
    { code: "ru", name: "Русский", flag: "ru" },
    { code: "fr", name: "Français", flag: "fr" },
    { code: "ja", name: "日本語", flag: "jp" },
    { code: "zh", name: "中文", flag: "cn" },
  ] as const;

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
    setIsLanguageDropdownOpen(false);
  };

  return (
    <div className="fixed top-0 w-full z-50">
      {/* Language Selector Bar */}
      <div className="bg-gray-50 w-full flex justify-end px-4 py-1">
        {/* Theme Toggle (commented out for future use)
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <FiSun className="w-5 h-5 text-yellow-400" />
          ) : (
            <FiMoon className="w-5 h-5 text-gray-600" />
          )}
        </button>
        */}
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={() => {
              setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
              setIsContactDropdownOpen(false); // Close contact dropdown
            }}
            className="flex items-center text-gray-700 hover:text-blue-600 p-1 text-sm"
            aria-label="Change language"
            aria-expanded={isLanguageDropdownOpen}
          >
            <span
              className={`fi fi-${currentLanguage.flag} w-5 h-4 rounded-sm inline-block`}
            ></span>
            <span className="mx-1 text-sm font-medium">
              {currentLanguage.code.toUpperCase()}
            </span>
            <FiChevronDown
              className={`transition-transform ${
                isLanguageDropdownOpen ? "transform rotate-180" : ""
              } text-xs`}
              size={14}
            />
          </button>

          {isLanguageDropdownOpen && (
            <div
              className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="language-menu"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                    i18n.language === lang.code
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`fi fi-${lang.flag} w-5 h-4 rounded-sm inline-block mr-2`}
                  ></span>
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-sm w-full border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center rtl:space-x-reverse space-x-3">
              <div className="h-10 w-10 flex-shrink-0">
                <Logo className="text-gray-900" />
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-[#1E2A78] to-[#2F3FD4] bg-clip-text text-transparent whitespace-nowrap">
                {t("app.title")}
              </span>
            </div>

            {/* Right-aligned items */}
            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                <NavItem href="#" text={t("nav.home")} />
                <NavItem href="#about" text={t("nav.about")} />
                <NavItem href="#services" text={t("nav.services")} />
                <NavItem href="#industries" text={t("nav.industries")} />
                <NavItem href="#portfolio" text={t("nav.portfolio")} />
                <NavItem href="#insights" text={t("nav.insights")} />
                <NavItem href="#careers" text={t("nav.careers")} />

                {/* Contact Us Dropdown */}
                <div className="relative group" ref={contactDropdownRef}>
                  <button
                    className="flex items-center text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors duration-200 group-hover:text-blue-600"
                    onClick={() => {
                      setIsContactDropdownOpen(!isContactDropdownOpen);
                      setIsLanguageDropdownOpen(false); // Close language dropdown
                    }}
                    aria-expanded={isContactDropdownOpen}
                    aria-haspopup="true"
                  >
                    {t("nav.contact")}
                    <FiChevronDown
                      className={`ml-1 transition-transform duration-200 ${
                        isContactDropdownOpen ? "transform rotate-180" : ""
                      }`}
                      size={16}
                    />
                  </button>

                  {/* Glassmorphism Dropdown */}
                  {isContactDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-64 rounded-xl bg-white/80 backdrop-blur-lg shadow-xl z-50 overflow-hidden border border-white/20"
                      style={{
                        background: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                      }}
                    >
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-blue-100/20 -z-10"></div>

                      <div className="py-2">
                        <a
                          href="#contact-info"
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 transition-colors duration-200"
                        >
                          Contact Information
                        </a>
                        <a
                          href="#request-quote"
                          className="block px-4 py-3 text-sm font-medium text-blue-700 hover:bg-blue-50/50 transition-colors duration-200 border-t border-gray-100"
                        >
                          Request a Quote
                        </a>
                        <a
                          href="#book-meeting"
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 transition-colors duration-200 border-t border-gray-100"
                        >
                          Book a Meeting
                        </a>
                        <a
                          href="#talk-to-sales"
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 transition-colors duration-200 border-t border-gray-100"
                        >
                          Talk to Sales
                        </a>
                        <a
                          href="#locations"
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 transition-colors duration-200 border-t border-gray-100"
                        >
                          Our Locations
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <button
                className="ml-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/30"
                style={{
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.4)",
                }}
              >
                {t("nav.consultation")}
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={
                    isMobileMenuOpen ? "Close main menu" : "Open main menu"
                  }
                  aria-expanded={isMobileMenuOpen}
                >
                  <span className="sr-only">
                    {isMobileMenuOpen ? "Close main menu" : "Open main menu"}
                  </span>
                  {isMobileMenuOpen ? (
                    <FiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu, show/hide based on menu state */}
          <div
            ref={menuRef}
            className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.home")}
              </a>
              <a
                href="#about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.about")}
              </a>
              <a
                href="#services"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.services")}
              </a>
              <a
                href="#industries"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.industries")}
              </a>
              <a
                href="#portfolio"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.portfolio")}
              </a>
              <a
                href="#insights"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.insights")}
              </a>
              <a
                href="#careers"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.careers")}
              </a>
              <a
                href="#contact"
                className="mt-4 w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.consultation")}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
