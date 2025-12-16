import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t, isRTL } = useLanguage();
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Company Info */}
          <div className="space-y-4">
            <div
              className={`flex items-center ${
                isRTL ? "justify-end" : "justify-start"
              }`}
            >
              <Logo />
            </div>
            <p className="text-gray-600 text-sm">{t("company.description")}</p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-purple-600 transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-purple-600 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-purple-600 transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-purple-600 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={`text-lg font-semibold text-gray-900 mb-4 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors block py-1"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors block py-1"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors block py-1"
                >
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors block py-1"
                >
                  {t("nav.testimonials")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors block py-1"
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className={`text-lg font-semibold text-gray-900 mb-4 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("footer.ourServices")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors block py-1"
                >
                  {t("footer.services.webDevelopment")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors block py-1"
                >
                  {t("footer.services.mobileApps")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors block py-1"
                >
                  {t("footer.services.uiUxDesign")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors block py-1"
                >
                  {t("footer.services.cloudSolutions")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors block py-1"
                >
                  {t("footer.services.itConsulting")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className={`text-lg font-semibold text-gray-900 mb-4 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("footer.contactUs")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-purple-600 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  {t("footer.address")}
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-purple-600 mr-3 flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors"
                >
                  {t("footer.phone")}
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-purple-600 mr-3 flex-shrink-0" />
                <a
                  href="mailto:info@azaroth.com"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors"
                >
                  {t("footer.email")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-center text-gray-500 text-sm">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
