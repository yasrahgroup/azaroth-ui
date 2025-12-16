import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation(); // Use useTranslation from react-i18next

  // Define nav items with type safety
  const navItems = [
    { path: "/", label: "nav.home" },
    { path: "/services", label: "nav.services" },
    { path: "/blog", label: "nav.blog" },
    { path: "/quote", label: "nav.quote" },
  ] as const;

  return (
    <header className="bg-white dark:bg-dark-bg shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Text */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-azure-radiance-600 dark:text-azure-radiance-400 text-2xl">
              AZAROTH TECH-HIVE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-medium px-3 py-2 rounded-md transition duration-300 ease-in-out ${
                  location.pathname === item.path
                    ? "text-azure-radiance-600 bg-azure-radiance-50 dark:bg-azure-radiance-900"
                    : "text-gray-700 dark:text-gray-300 hover:text-azure-radiance-600 dark:hover:text-azure-radiance-400 hover:bg-azure-radiance-50 dark:hover:bg-azure-radiance-900"
                }`}
              >
                {t(item.label as any)}
              </Link>
            ))}

            <Link
              to="/connect" // Changed path for CTA
              className="ml-4 bg-azure-radiance-600 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-azure-radiance-700 transition duration-300 ease-in-out shadow-lg"
            >
              {t("cta.connect")}
            </Link>
            <LanguageSelector />
          </nav>

          {/* Mobile Toggle & Language */}
          <div className="flex items-center md:hidden">
            <LanguageSelector />
            <button
              className="ml-4 text-gray-700 dark:text-gray-300"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-dark-bg border-t border-gray-200 dark:border-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/connect"
            onClick={() => setOpen(false)}
            className="block px-6 py-3 bg-azure-radiance-600 text-white text-center font-semibold hover:bg-azure-radiance-700 m-4 rounded-full shadow-lg"
          >
            {t("cta.connect")}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
