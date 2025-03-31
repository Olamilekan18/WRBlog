import React from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { BookText, PenLine, BarChart2, Users } from "lucide-react"; // Import relevant icons

const FeatureSection = () => {
  const { isDark } = useDarkMode();

  // Feature data array
  const features = [
    {
      icon: <PenLine size={40} />,
      title: "Intuitive Editor",
      description: "Write with our distraction-free Markdown editor"
    },
    {
      icon: <BookText size={40} />,
      title: "Story Formats",
      description: "Choose from multiple post layouts and templates"
    },
    {
      icon: <BarChart2 size={40} />,
      title: "Performance Stats",
      description: "Track your readership and engagement metrics"
    },
    {
      icon: <Users size={40} />,
      title: "Built-in Audience",
      description: "Get discovered by our community of readers"
    }
  ];
//bg-gray-100 dark:bg-gray-900
  return (
    <section className={`py-16 px-4 transition-colors duration-300 ${isDark ? "bg-gray-800" : "bg-grey-100"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-green-700"}`}>
            Powerful Publishing Tools
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-green-600"}`}>
            Everything you need to create, publish, and grow your blog
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`p-6 rounded-xl transition-all duration-300 hover:shadow-lg ${
                isDark 
                  ? "bg-gray-700 hover:bg-gray-600 border border-gray-600" 
                  : "bg-white hover:bg-green-100 border border-green-200"
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                isDark 
                  ? "bg-green-900 text-green-300" 
                  : "bg-green-100 text-green-600"
              }`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                isDark ? "text-white" : "text-green-800"
              }`}>
                {feature.title}
              </h3>
              <p className={isDark ? "text-gray-300" : "text-green-600"}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;