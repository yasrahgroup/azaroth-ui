// App.tsx - Main application component
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

// Import components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import TranslationTest from "./components/TranslationTest";

function App() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isRTL]);

  return (
    <Router>
      <div
        className={`min-h-screen flex flex-col bg-white ${
          isRTL ? "font-rtl" : ""
        }`}
      >
        <Helmet>
          <html lang={i18n.language} dir={isRTL ? "rtl" : "ltr"} />
          <title>{t("meta.title", "Azaroth Tech-Hive")}</title>
          <meta
            name="description"
            content={t(
              "meta.description",
              "Your Premium Digital Solutions Partner"
            )}
          />
        </Helmet>

        <Navbar />
        <Chatbot />

        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <FeaturesSection />
                  <AboutSection />
                </>
              }
            />

            <Route
              path="/about"
              element={
                <div className="container mx-auto px-4 py-16">
                  <h1 className="text-4xl font-bold text-center">About Page</h1>
                  <p className="text-center mt-4">
                    About page content coming soon...
                  </p>
                </div>
              }
            />

            <Route
              path="/services"
              element={
                <div className="container mx-auto px-4 py-16">
                  <h1 className="text-4xl font-bold text-center">
                    Services Page
                  </h1>
                  <p className="text-center mt-4">
                    Services page content coming soon...
                  </p>
                </div>
              }
            />

            <Route
              path="/contact"
              element={
                <div className="container mx-auto px-4 py-16">
                  <h1 className="text-4xl font-bold text-center">
                    Contact Page
                  </h1>
                  <p className="text-center mt-4">
                    Contact page content coming soon...
                  </p>
                </div>
              }
            />
          </Routes>
        </main>

        {/* ✅ Footer WITHOUT props */}
        <Footer />

        {/* Development-only route for translation testing */}
        {process.env.NODE_ENV === "development" && (
          <Routes>
            <Route path="/test-translations" element={<TranslationTest />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
