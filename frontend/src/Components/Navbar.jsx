import React, { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav className={`flex items-center justify-between p-4 bg-gray-100 shadow-md border-b border-green-300 transition duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-green-700'}`}>
      {/* Logo */}
      <div className="text-xl font-bold">LOGO</div>

      {/* Desktop Dark Mode Toggle */}
      <button onClick={() => setDarkMode(!darkMode)} className="hidden md:block p-2 rounded cursor-pointer border border-green-300 hover:bg-green-200 hover:text-white dark:hover:bg-green-700">
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-green-700" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Links (Desktop) */}
      <ul className="hidden md:flex space-x-6">
        <li><a href="#" className="border-b-2 border-transparent cursor-pointer hover:border-green-500 transition">Online Investing</a></li>
        <li><a href="#" className="border-b-2 border-transparent cursor-pointer hover:border-green-500 transition">Private Wealth</a></li>
        <li><a href="#" className="border-b-2 border-transparent cursor-pointer hover:border-green-500 transition">Magazine</a></li>
        <li><a href="#" className="border-b-2 border-transparent cursor-pointer hover:border-green-500 transition">About Us</a></li>
      </ul>

      {/* CTA Buttons */}
      <div className="hidden md:flex space-x-4">
        <button className="px-4 py-2 border border-green-500 rounded-lg cursor-pointer hover:text-white hover:bg-green-100 dark:hover:bg-green-700">Log in</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600">
          Become a client
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className={`absolute top-0 left-0 w-full h-screen p-6 shadow-lg md:hidden transition duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-green-700'}`}>
          <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>

          {/* Mobile Dark Mode Toggle */}
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 border border-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-700">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <ul className="space-y-4 mt-10">
            <li><a href="#" className="block text-lg border-b-2 border-transparent hover:border-green-500 transition">Online Investing</a></li>
            <li><a href="#" className="block text-lg border-b-2 border-transparent hover:border-green-500 transition">Private Wealth</a></li>
            <li><a href="#" className="block text-lg border-b-2 border-transparent hover:border-green-500 transition">Magazine</a></li>
            <li><a href="#" className="block text-lg border-b-2 border-transparent hover:border-green-500 transition">About Us</a></li>
          </ul>
          <div className="mt-6">
            <button className="w-full py-2 border border-green-500 rounded-lg hover:bg-green-100  dark:hover:bg-green-700">Log in</button>
            <button className="w-full py-2 mt-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Become a client
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
