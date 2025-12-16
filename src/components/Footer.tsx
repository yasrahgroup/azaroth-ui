import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface FooterProps {
  companyName: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  services: string[];
  quickLinks: Array<{
    text: string;
    href: string;
  }>;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
  };
  copyright: string;
  socialTitle: string;
  closingText: string;
}

const Footer: React.FC<FooterProps> = ({
  companyName,
  contactInfo,
  quickLinks,
  socialLinks,
  copyright,
  socialTitle,
  closingText,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-white dark:bg-dark-bg border-t border-gray-200 dark:border-gray-700 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6" dir={i18n.dir()}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div
              className={`flex items-center ${
                i18n.dir() === "rtl" ? "justify-end" : "justify-start"
              }`}
            >
              <span className="font-bold text-azure-radiance-600 dark:text-azure-radiance-400 text-xl">
                {companyName}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {closingText}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-azure-radiance-600" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-azure-radiance-600 dark:hover:text-azure-radiance-400 text-sm"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-azure-radiance-600" />
                <a
                  href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-azure-radiance-600 dark:hover:text-azure-radiance-400 text-sm"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-azure-radiance-600 mt-1 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {contactInfo.address}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={`${i18n.dir() === "rtl" ? "text-right" : "text-left"}`}
          >
            <h4
              className={`text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4`}
            >
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-azure-radiance-600 dark:hover:text-azure-radiance-400 text-sm transition-colors block py-1"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div
            className={`${i18n.dir() === "rtl" ? "text-right" : "text-left"}`}
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {socialTitle}
            </h4>
            <div
              className={`flex space-x-4 ${
                i18n.dir() === "rtl" ? "justify-end" : "justify-start"
              }`}
            >
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-azure-radiance-600 dark:hover:text-azure-radiance-400 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-azure-radiance-600 dark:hover:text-azure-radiance-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-azure-radiance-600 dark:hover:text-azure-radiance-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
