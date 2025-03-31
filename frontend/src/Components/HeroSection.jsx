import React from "react";
import heroImage from "../assets/heroImage.jpg";
import { useDarkMode } from "../context/DarkModeContext";

const HeroSection = () => {
  const { isDark } = useDarkMode();

  return (
      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-gray-100 dark:bg-gray-900 transition duration-300">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-300">
            Write your own story
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
            We are here to help you share your thoughts and ideas with the world.
          </p>
          <button className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-400 transition">
            Become a blogger
          </button>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <div className="w-72 h-72 bg-gray-300 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
            <img
              src={heroImage}
              alt="Hero"
              className="w-full h-full object-cover transition duration-300"
            />
          </div>
        </div>
        <hr />
      </section>
    // </div>
  );
};

export default HeroSection;