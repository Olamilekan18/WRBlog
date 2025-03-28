import React, { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

const Navbar = () => {
//   const { darkMode, setDarkMode } = useDarkMode();
const { isDark, toggle } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`flex items-center justify-between p-4 border-b shadow-md transition-colors duration-300 ${
      isDark ? "bg-gray-900 text-white border-gray-700" : "bg-gray-100 text-green-700 border-green-300"
    }`}>
      {/* Logo */}
      <div className="text-xl font-bold">WRBlog</div>

      {/* Dark Mode Toggle (Desktop) */}
      <button
        onClick={toggle}
        className={`hidden md:block p-2 rounded border ${
          isDark ? "border-gray-600 hover:bg-gray-700" : "border-green-300 hover:bg-green-200"
        }`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Mobile Menu Button */}
      <button
        className={`md:hidden ${isDark ? "text-white" : "text-green-700"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex space-x-6">
        <li>
          <a href="#" className="border-b-2 border-transparent hover:border-green-500 transition">
            About Us
          </a>
        </li>
        <li>
          <a href="#" className="border-b-2 border-transparent hover:border-green-500 transition">
            View Blogs
          </a>
        </li>
        <li>
          <a href="#" className="border-b-2 border-transparent hover:border-green-500 transition">
            Contact
          </a>
        </li>
      </ul>

      {/* Desktop CTA Buttons */}
      <div className="hidden md:flex space-x-4">
        <button className={`px-4 py-2 border ${
          isDark ? "border-gray-600 hover:bg-gray-700" : "border-green-500 hover:bg-green-100"
        } rounded-lg`}>
          Log in
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Become a blogger
        </button>
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
            <button className={`w-full py-2 border ${
              isDark ? "border-gray-600 hover:bg-gray-700" : "border-green-500 hover:bg-green-100"
            } rounded-lg`}>
              Log in
            </button>
            <button className="w-full py-2 mt-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Become a blogger
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;