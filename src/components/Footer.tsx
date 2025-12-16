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
import { FiArrowRight } from "react-icons/fi";

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();

  const quickLinks = [
    { text: t("nav.home"), href: "/" },
    { text: t("nav.about"), href: "/about" },
    { text: t("nav.services"), href: "/services" },
    { text: t("nav.contact"), href: "/contact" },
  ];

  const socialLinks = {
    facebook: "https://facebook.com/azaroth-tech",
    twitter: "https://twitter.com/azaroth-tech",
    linkedin: "https://linkedin.com/company/azaroth-tech",
  };

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16" dir={i18n.dir()}>
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              {t("footer.companyName")}
            </h3>
            <p className="text-blue-100 text-sm mb-6">{t("footer.tagline")}</p>

            <div className="flex gap-3 mt-4">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-800 hover:bg-blue-600 transition-colors duration-200"
              >
                <FaFacebook className="text-white text-lg" />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-800 hover:bg-blue-600 transition-colors duration-200"
              >
                <FaTwitter className="text-white text-lg" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-800 hover:bg-blue-600 transition-colors duration-200"
              >
                <FaLinkedin className="text-white text-lg" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-blue-600 pb-2 inline-block">
              {t("footer.contactUs")}
            </h4>

            <ul className="space-y-4 text-sm text-blue-100">
              <li className="flex gap-3">
                <FaMapMarkerAlt className="text-blue-300 mt-1" />
                {t("footer.address")}
              </li>
              <li className="flex gap-3">
                <FaEnvelope className="text-blue-300" />
                <a
                  href={`mailto:${t("footer.email")}`}
                  className="hover:text-white"
                >
                  {t("footer.email")}
                </a>
              </li>
              <li className="flex gap-3">
                <FaPhone className="text-blue-300" />
                <a
                  href={`tel:${t("footer.phone").replace(/[^0-9+]/g, "")}`}
                  className="hover:text-white"
                >
                  {t("footer.phone")}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-blue-600 pb-2 inline-block">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
                  >
                    <FiArrowRight size={14} className="text-blue-300" />
                    <span className="text-sm">{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-blue-600 pb-2 inline-block">
              {t("footer.newsletter")}
            </h4>
            <p className="text-blue-100 text-sm mb-4">
              {t("footer.newsletterText")}
            </p>
            <form className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  className="flex-1 px-4 py-2 rounded bg-blue-800 border border-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded font-medium text-sm whitespace-nowrap transition-colors"
                >
                  {t("footer.subscribe")}
                </button>
              </div>
              <p className="text-xs text-blue-300 leading-relaxed">
                {t("footer.newsletterPrivacy")}
              </p>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-blue-700 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-blue-200 text-center md:text-left">
              {t("footer.rights")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link
                to="/privacy"
                className="text-sm text-blue-200 hover:text-white transition-colors"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                to="/terms"
                className="text-sm text-blue-200 hover:text-white transition-colors"
              >
                {t("footer.terms")}
              </Link>
              <Link
                to="/sitemap"
                className="text-sm text-blue-200 hover:text-white transition-colors"
              >
                {t("footer.sitemap")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
