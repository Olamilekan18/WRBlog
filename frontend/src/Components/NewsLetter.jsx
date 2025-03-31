import React, { useState } from "react"; // Import useState
import { useDarkMode } from "../context/DarkModeContext";
import axios from "axios";

const Newsletter = () => {
  const { isDark } = useDarkMode(); // Use the context to get the dark mode state
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setIsError] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const { data } = await axios.post("http://localhost:5000/api/subscribe", { email });
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

  return (
    // <section className={`py-16 px-4 transition-colors duration-300 ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
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
      </div>
    // </section>
  );
};

export default Newsletter;