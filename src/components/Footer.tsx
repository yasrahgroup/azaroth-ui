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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              {t("footer.companyName")}
            </h3>
            <p className="text-blue-100 text-sm mb-6">{t("footer.tagline")}</p>

            <div className="flex gap-3 mt-4">
              <a href={socialLinks.facebook} target="_blank" rel="noreferrer">
                <FaFacebook />
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.contactUs")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <FaMapMarkerAlt /> {t("footer.address")}
              </li>
              <li className="flex gap-2">
                <FaEnvelope /> {t("footer.email")}
              </li>
              <li className="flex gap-2">
                <FaPhone /> {t("footer.phone")}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="flex gap-2">
                    <FiArrowRight /> {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.newsletter")}</h4>
            <p className="text-sm">{t("footer.newsletterText")}</p>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 text-sm text-center">
          {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
