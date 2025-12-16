import React from "react";
import { Rocket, Code, Palette, Zap } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <Rocket className="w-8 h-8 text-blue-600" />,
      title: "Fast Performance",
      description:
        "Lightning-fast websites optimized for speed and user experience with cutting-edge technologies.",
    },
    {
      icon: <Code className="w-8 h-8 text-purple-600" />,
      title: "Clean Code",
      description:
        "Well-structured, maintainable code following industry best practices and standards.",
    },
    {
      icon: <Palette className="w-8 h-8 text-pink-600" />,
      title: "Modern Design",
      description:
        "Beautiful, responsive designs that captivate users and provide exceptional experiences.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Innovation",
      description:
        "Creative solutions that push boundaries and deliver unique, memorable digital experiences.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What We Offer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive web development services tailored to bring your vision
            to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
            >
              <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
