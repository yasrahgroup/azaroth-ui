import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { i18n } = useTranslation();

  return (
    <div
      className={`min-h-screen flex flex-col ${
        i18n.dir() === "rtl" ? "font-arabic" : "font-sans"
      }`}
      dir={i18n.dir()}
    >
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer
        companyName="Azaroth"
        contactInfo={{
          email: "contact@example.com",
          phone: "+1234567890",
          address: "123 Business St, City, Country",
        }}
        services={["Web Development", "UI/UX Design", "Mobile Apps"]}
        quickLinks={[
          { text: "Home", href: "/" },
          { text: "About", href: "/about" },
          { text: "Services", href: "/services" },
          { text: "Contact", href: "/contact" },
        ]}
        socialLinks={{
          facebook: "https://facebook.com",
          twitter: "https://twitter.com",
          linkedin: "https://linkedin.com",
        }}
        copyright="© 2025 Azaroth. All rights reserved."
        socialTitle="Follow Us"
        closingText="Thank you for visiting!"
      />
    </div>
  );
};

export default Layout;
