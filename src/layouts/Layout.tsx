import React, { ReactNode } from "react";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface LayoutProps {
  children: ReactNode;
}

const LayoutContent: React.FC<LayoutProps> = ({ children }) => {
  const { locale } = useLanguage();

  const footerData = {
    companyName: "footer.company.name",
    tagline: "footer.company.tagline",
    anniversaryText: "footer.anniversaryText",
    contactInfo: {
      email: "footer.contact.email",
      phone: "footer.contact.phone",
      address: "footer.contact.address",
    },
    services: [
      "footer.services.list.web",
      "footer.services.list.mobile",
      "footer.services.list.cloud",
      "footer.services.list.uiux",
    ],
    quickLinks: [
      { text: "nav.home", href: "/" },
      { text: "nav.about", href: "/about" },
      { text: "nav.services", href: "/services" },
      { text: "nav.contact", href: "/contact" },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com",
      twitter: "https://www.twitter.com",
      facebook: "https://www.facebook.com",
    },
    anniversaryOffer: "footer.anniversaryOffer",
    copyright: "footer.copyright",
    servicesTitle: "footer.titles.services",
    quickLinksTitle: "footer.titles.quickLinks",
    contactTitle: "footer.titles.contact",
    socialTitle: "footer.titles.social",
    closingText: "footer.closingText",
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        locale === "ar" ? "font-arabic" : "font-sans"
      }`}
    >
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer {...footerData} />
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <LayoutContent>{children}</LayoutContent>
    </LanguageProvider>
  );
};

export default Layout;
