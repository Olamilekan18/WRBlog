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
import Dashboard from "./Pages/Dashboard.jsx";
import "./App.css"; 
import AllPosts from "./Pages/AllPosts.jsx";
import Editor from "./Pages/Editor.jsx";
import PostDetails from "./Pages/PostDetails.jsx";
import ProtectedRoute from "./Components/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition duration-300">
          <Routes>
            {/* Public Routes */}
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
            <Route path="/signup" element={<AuthForm type="signup" />} />
            <Route path="/login" element={<AuthForm type="login" />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/all-posts"
              element={
                <ProtectedRoute>
                  <AllPosts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editor"
              element={
                <ProtectedRoute>
                  <Editor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editor/:postId"
              element={
                <ProtectedRoute>
                  <Editor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/posts/:postId"
              element={
                <ProtectedRoute>
                  <PostDetails />
                </ProtectedRoute>
              }
            />

            {/* 404 Not Found Route */}
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-screen">
                  <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                    404 - Page Not Found
                  </h1>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;