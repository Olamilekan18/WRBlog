import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import AboutUsSection from "./Components/AboutUsSection";
import FeatureSection from "./Components/FeatureSection.jsx";
import FeaturedPostsSection from "./Components/FeaturedPosts.jsx";
import TestimonialsSection from "./Components/Testimonials.jsx";
import Newsletter from "./Components/NewsLetter.jsx";
import AuthForm from "./Pages/Signup.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import Home from "./Pages/Home.jsx";
import "./App.css"; 
import AllPosts from "./Pages/AllPosts.jsx";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition duration-300">
          {/* <Navbar /> */}
          <Routes>
            {/* Homepage Route */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <HeroSection />
                  <AboutUsSection />
                  <FeatureSection />
                  <FeaturedPostsSection />
                  <TestimonialsSection />
                  <Newsletter />
                </>
              }
            />

            {/* Signup Route */}
            <Route path="/signup" element={<AuthForm type="signup" />} />

            {/* Login Route */}
            <Route path="/login" element={<AuthForm type="login" />} />
            {/* Forgot Password Route */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Reset Password Route */}
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Homepage Route */}
            <Route path="/home" element={<>
            {/* <HomeNavbar/> */}
            <Home/>
            </>} /> 
            <Route path = 'all-posts' element={<AllPosts/>}/>
            

          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;