import React, { useState, useEffect } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";

const TestimonialsSection = () => {
  const { isDark } = useDarkMode();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Testimonial data - replace with API call later
  const testimonials = [
    {
      id: 1,
      quote: "WRBlog helped me grow from 100 to 10,000 monthly readers in just six months. The community engagement is incredible!",
      author: "Sarah Johnson",
      role: "Food Blogger",
      rating: 5
    },
    {
      id: 2,
      quote: "As a tech writer, I've tried many platforms. WRBlog's clean interface and monetization options are unmatched.",
      author: "Michael Chen",
      role: "Tech Writer",
      rating: 4
    },
    {
      id: 3,
      quote: "The analytics dashboard helped me understand my audience better than any other platform I've used.",
      author: "Emma Rodriguez",
      role: "Travel Blogger",
      rating: 5
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className={`py-16 px-4 transition-colors duration-300 ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-green-700"}`}>
            What Our Writers Say
          </h2>
          <p className={`text-lg ${isDark ? "text-gray-300" : "text-green-600"}`}>
            Join thousands of creators building their audience
          </p>
        </div>

        <div className="relative">
          <div 
            key={testimonials[currentIndex].id}
            className={`p-8 rounded-xl transition-all duration-500 hover:shadow-lg ${
              isDark 
                ? "bg-gray-700 hover:bg-gray-600 border border-gray-600" 
                : "bg-white hover:bg-green-50 border border-green-100"
            }`}
          >
            <Quote className={`mb-4 ${isDark ? "text-green-400" : "text-green-600"}`} size={32} />
            <p className={`text-lg mb-6 ${isDark ? "text-gray-300" : "text-green-800"}`}>
              "{testimonials[currentIndex].quote}"
            </p>
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                isDark 
                  ? "bg-gray-600 text-green-300" 
                  : "bg-green-100 text-green-600"
              }`}>
                <span className="text-lg font-medium">
                  {testimonials[currentIndex].author.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className={`font-semibold ${isDark ? "text-white" : "text-green-800"}`}>
                  {testimonials[currentIndex].author}
                </h4>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-green-600"}`}>
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? (isDark ? "bg-green-400" : "bg-green-600") 
                  : (isDark ? "bg-gray-500" : "bg-green-200")
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
