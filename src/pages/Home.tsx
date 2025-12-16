import React from "react";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{t("app.title")}</h1>
      <p className="text-lg">{t("app.description")}</p>
    </div>
  );
};

export default Home;
