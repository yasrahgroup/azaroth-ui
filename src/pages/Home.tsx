import React from "react";
import { useLanguage } from "../hooks/useLanguage";

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{t("home.title")}</h1>
      <p className="text-lg">{t("home.subtitle")}</p>
    </div>
  );
};

export default Home;
