import React from "react";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import "./App.css"; // Import your global CSS file
import AboutUsSection from "./Components/AboutUsSection";
import FeatureSection from "./Components/FeatureSection.jsx";
import FeaturedPostsSection from "./Components/FeaturedPosts.jsx";
import TestimonialsSection from "./Components/Testimonials.jsx";
import Newsletter from "./Components/NewsLetter.jsx";

// import { ThemeProvider } from "./context/ThemeProvider.jsx";
function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition duration-300">
        <Navbar />
        <HeroSection />
        <AboutUsSection />
        <FeatureSection />
        <FeaturedPostsSection />
        <TestimonialsSection />
        <Newsletter />
      </div>
    </DarkModeProvider>
  );
}

export default App;
