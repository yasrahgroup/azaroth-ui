import React from "react";
import { useTranslation } from "react-i18next";

const TranslationTest: React.FC = () => {
  const { t, i18n } = useTranslation();
  const languages = ["en", "ar", "fr", "ru", "ja", "zh"] as const;

  const testKeys = [
    "app.title",
    "nav.home",
    "nav.about",
    "hero.welcome",
    "footer.companyName",
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Translation Test</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Current Language: {i18n.language}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => i18n.changeLanguage(lang)}
              className={`px-4 py-2 rounded ${
                i18n.language === lang
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {t(`languages.${lang}`, lang)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {testKeys.map((key) => (
          <div key={key} className="p-4 bg-white rounded border">
            <div className="font-mono text-sm text-gray-500 mb-1">{key}</div>
            <div className="text-lg">
              {t(key, `[TRANSLATION MISSING: ${key}]`)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
        <h3 className="font-semibold mb-2">RTL Test:</h3>
        <p className={i18n.dir() === "rtl" ? "text-green-600" : "text-red-600"}>
          {i18n.dir() === "rtl"
            ? "✓ RTL layout is active (correct for Arabic)"
            : "RTL layout is not active"}
        </p>
      </div>
    </div>
  );
};

export default TranslationTest;
