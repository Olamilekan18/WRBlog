import React, { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import "./search.css"; // Import your CSS file for search styles

const HomeNavbar = () => {
//   const { darkMode, setDarkMode } = useDarkMode();
const { isDark, toggle } = useDarkMode();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleBecomeBlogger = () => {
    navigate("/signup"); // Navigate to the /signup route
  }

  const handleLogin = () => {
    navigate("/login"); // Navigate to the /login route
  }

  const handleDashboard = () =>{
    navigate('/dashboard')
  }
  return (
    <nav className={`flex items-center justify-between p-4 border-b shadow-md transition-colors duration-300 ${
      isDark ? "bg-gray-900 text-white border-gray-700" : "bg-gray-100 text-green-700 border-green-300"
    }`}>
      {/* Logo */}
      <div className="text-xl font-bold">WRBlog</div>

      {/* Dark Mode Toggle (Desktop) */}
      <button
        onClick={toggle}
        className={`hidden cursor-pointer md:block p-2 rounded border ${
          isDark ? "border-gray-600 hover:bg-gray-700" : "border-green-300 hover:bg-green-200"
        }`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <div className="search-container">
        <input type="text" name="" id="" placeholder="Search..." />
        <button><Search/></button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className={`md:hidden ${isDark ? "text-white" : "text-green-700"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex space-x-6">
        {/* <li>
          <a href="#" className="border-b-2 border-transparent hover:border-green-500 transition">
            About Us
          </a>
        </li> */}
        <li>
          <a href="/all-posts" className="border-b-2 border-transparent hover:border-green-500 transition">
            View Blogs
          </a>
        </li>
        <li>
          <a href="/editor" className="border-b-2 border-transparent hover:border-green-500 transition">
            Write Blogs
          </a>
        </li>
      </ul>

      {/* <div className="search-container">
        <input type="text" placeholder="Search..." className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 text-black ${isDark? "text-white" : "text-gray-900"}`} />
      </div> */}

      {/* <div className="search-container">
        <input type="text" name="" id="" placeholder="Search..." />
        <button><Search/></button>
      </div> */}

      {/* Desktop CTA Buttons */}
      <div className="hidden md:flex space-x-4">
        <button onClick={handleLogin} className={`px-4 py-2 cursor-pointer border ${
          isDark ? "border-gray-600 hover:bg-gray-700" : "border-green-500 hover:bg-green-100"
        } rounded-lg`}>
          Log out
        </button>
        <button 
          onClick={handleDashboard}  // Navigate to the /signup route when clicked
        className="px-4 py-2 bg-green-500 cursor-pointer text-white rounded-lg hover:bg-green-600">
            Dashboard        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className={`fixed inset-0 z-50 p-6 pt-16 md:hidden ${
          isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-green-700"
        }`}>
          <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>

          {/* Mobile Dark Mode Toggle */}
          <button
            onClick={toggle}
            className={`p-2 border ${
              isDark ? "border-gray-600 hover:bg-gray-700" : "border-green-300 hover:bg-green-200"
            } rounded-lg`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <ul className="space-y-4 mt-10">
            <li>
              <a href="#" className="block text-lg border-b-2 border-transparent hover:border-green-500">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="block text-lg border-b-2 border-transparent hover:border-green-500">
                View Blogs
              </a>
            </li>
            <li>
              <a href="#" className="block text-lg border-b-2 border-transparent hover:border-green-500">
                Contact
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <button onClick={handleLogin} className={`w-full py-2 cursor-pointer border ${
              isDark ? "border-gray-600 hover:bg-gray-700" : "border-green-500 hover:bg-green-100"
            } rounded-lg`}>
              Log out
            </button>
            <button  onClick={handleDashboard} className="w-full py-2 mt-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Dashboard
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar; 