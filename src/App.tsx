// App.tsx - Main application component
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import AboutSection from "./components/AboutSection";
import PortfolioGrid from "./components/PortfolioGrid";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <FeaturesSection />
                  <AboutSection />
                  <PortfolioGrid />
                  <TestimonialsSection />
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
              path="/testimonials"
              element={
                <div className="container mx-auto px-4 py-16">
                  <h1 className="text-4xl font-bold text-center">
                    Testimonials Page
                  </h1>
                  <p className="text-center mt-4">
                    Testimonials page content coming soon...
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

        <Footer
          companyName="PortfolioPro"
          tagline="Creating exceptional digital experiences that drive results."
          anniversaryText="Celebrating 5 years of excellence"
          contactInfo={{
            email: "contact@portfolioPro.com",
            phone: "+1 (555) 123-4567",
            address: "123 Design Street, Creative City, CC 12345",
          }}
          services={[
            "Web Design",
            "Development",
            "UI/UX Design",
            "Mobile Apps",
          ]}
          quickLinks={[
            { text: "Home", href: "/" },
            { text: "About", href: "/about" },
            { text: "Services", href: "/services" },
            { text: "Contact", href: "/contact" },
          ]}
          socialLinks={{
            linkedin: "#",
            twitter: "#",
            facebook: "#",
          }}
          anniversaryOffer="Special discount for new clients!"
          copyright={`© ${new Date().getFullYear()} PortfolioPro. All rights reserved.`}
          servicesTitle="Services"
          quickLinksTitle="Quick Links"
          contactTitle="Contact Info"
          socialTitle="Follow Us"
          closingText="Built with passion and precision."
        />
      </div>
    </Router>
  );
};

export default App;
