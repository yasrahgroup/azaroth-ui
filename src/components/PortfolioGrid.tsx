import React, { useState } from "react";
import { ExternalLink, Github } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const PortfolioGrid: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const portfolioItems: PortfolioItem[] = [
    {
      id: "1",
      title: "E-Commerce Platform",
      category: "Web Development",
      description:
        "Modern e-commerce solution with real-time inventory and payment processing.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      techStack: ["React", "Node.js", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "2",
      title: "Task Management App",
      category: "Mobile App",
      description:
        "Intuitive task management application with team collaboration features.",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      techStack: ["React Native", "Firebase", "Redux"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "3",
      title: "Portfolio Website",
      category: "UI/UX Design",
      description:
        "Creative portfolio showcase with smooth animations and interactions.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "4",
      title: "Social Media Dashboard",
      category: "Web Development",
      description:
        "Analytics dashboard for social media management and reporting.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      techStack: ["Vue.js", "D3.js", "Express"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "5",
      title: "Food Delivery App",
      category: "Mobile App",
      description:
        "User-friendly food ordering application with real-time tracking.",
      image:
        "https://images.unsplash.com/photo-1504754528276-78bbac3f5d84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      techStack: ["Flutter", "Node.js", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "6",
      title: "Blog Platform",
      category: "UI/UX Design",
      description:
        "Clean and modern blogging platform with rich content editing.",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      techStack: ["Gatsby", "GraphQL", "Contentful"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Web Development":
        return "bg-blue-100 text-blue-800";
      case "Mobile App":
        return "bg-green-100 text-green-800";
      case "UI/UX Design":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recent Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore my latest work and see how I bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    loadedImages[item.id] ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => handleImageLoad(item.id)}
                />
                {!loadedImages[item.id] && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                  <div className="flex gap-2">
                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition-colors"
                        aria-label="View live project"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-800 hover:text-white transition-colors"
                        aria-label="View source code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
