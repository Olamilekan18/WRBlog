import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = ({ isDark }) => {
  return (
    <div className={`py-10 px-5 text-center transition-colors duration-300 ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="container mx-auto px-6 text-center">
        {/* Navigation Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="/about" className="hover:underline">About Us</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="hover:text-blue-500"><FaFacebook size={24} /></a>
          <a href="#" className="hover:text-gray-400"><FaTwitter size={24} /></a>
          <a href="#" className="hover:text-pink-500"><FaInstagram size={24} /></a>
          <a href="#" className="hover:text-green-500"><FaWhatsapp size={24} /></a>
        </div>

        {/* Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()} WRBlog. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
