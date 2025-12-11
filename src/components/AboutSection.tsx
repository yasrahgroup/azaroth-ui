import React from "react";
import { Link } from "react-router-dom";
import { Users, Award, Coffee, Target } from "lucide-react";

const AboutSection: React.FC = () => {
  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      number: "50+",
      label: "Happy Clients",
    },
    {
      icon: <Award className="w-6 h-6" />,
      number: "100+",
      label: "Projects Completed",
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      number: "1000+",
      label: "Cups of Coffee",
    },
    {
      icon: <Target className="w-6 h-6" />,
      number: "5+",
      label: "Years Experience",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Me
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              I'm a passionate web developer and designer dedicated to creating
              exceptional digital experiences. With a keen eye for detail and a
              commitment to excellence, I transform ideas into stunning,
              functional websites that drive results and delight users.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              My approach combines creativity with technical expertise, ensuring
              every project not only looks beautiful but also performs
              flawlessly across all devices and platforms.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Learn More About Me
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Professional workspace"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold">5+</div>
              <div className="text-sm">Years Experience</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3 text-blue-600">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
