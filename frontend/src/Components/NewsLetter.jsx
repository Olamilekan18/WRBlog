import React, { useState } from "react"; // Import useState
import { useDarkMode } from "../context/DarkModeContext";
import axios from "axios";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6"
import { useNavigate } from "react-router-dom"; 


const Newsletter = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate(); 
  const { isDark } = useDarkMode(); 
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setIsError] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const { data } = await axios.post(`${backendUrl}/api/subscribe`, { email });
      setMessage(data.message);
      setEmail("");
      setIsError(false);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Subscription failed.");
      } else {
        setMessage("Something went wrong.");
      }
      setIsError(true);
    }
  };

  const handleAboutUs = () => {
    navigate("/aboutUs");
  }
  const handleContact = () => {
    navigate("/contact");
  }
  
const handlePrivacy = () => {
  navigate("/privacy");
}

  return (
      <div className={`py-10 px-5 text-center transition-colors duration-300 ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
        <h2 className="text-2xl font-bold mb-3">Subscribe to Our Newsletter</h2>
        <p className="mb-5">Get the latest updates and articles directly in your inbox.</p>
        <form onSubmit={handleSubscribe} className="flex flex-col items-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 text-black ${isDark? "text-white" : "text-gray-900"}`}
          />
          <button type="submit" className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-400 transition">
            Subscribe
          </button>
        </form>
        {message && <p className={`mt-3 text-sm ${error ? "text-red-500" : "text-green-500"}`}>{message}</p>}
        <div className={`py-10 px-5 text-center transition-colors duration-300 ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
              <div className="container mx-auto px-6 text-center">
                {/* Navigation Links */}
                <div className="flex justify-center space-x-6 mb-4">
                  <button onClick={handleAboutUs} className="hover:underline cursor-pointer">About Us</button>
                  <button onClick={handleContact} className="hover:underline cursor-pointer">Contact</button>
                  <button onClick={handlePrivacy} className="hover:underline cursor-pointer">Privacy Policy</button>
                </div>
        
                {/* Social Media Links */}
                <div className="flex justify-center space-x-4 mb-4">
                  <a href="https://web.facebook.com/ayomide.olamilekan.353803/" target = '_blank'  className="hover:text-blue-500"><FaFacebook size={24} /></a>
                  <a href="https://x.com/Olamilekan_js" target = '_blank' className="hover:text-gray-400"><FaXTwitter size={24} /></a>
                  <a href="https://www.instagram.com/olamilekan.js/" target = '_blank' className="hover:text-pink-500"><FaInstagram size={24} /></a>
                  <a href="https://wa.me//+2349035095897" target = '_blank' className="hover:text-green-500"><FaWhatsapp size={24} /></a>
                </div>
        
                {/* Copyright */}
                <p className="text-sm">
                  © {new Date().getFullYear()} WRBlog. All rights reserved.
                </p>
              </div>
            </div>
      </div>
    // </section>
  );
};

export default Newsletter;