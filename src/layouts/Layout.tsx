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
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
