import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../Components/ForgotPassword";
import HomeNavbar from "../Components/homeNavbar";

const AuthForm = ({ isDark, type, onAuthSuccess }) => {
    axios.defaults.baseURL = "http://localhost:5000"; 
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "", 
    name: "" 
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    
    try {
      const endpoint = type === "signup" 
        ? "/api/users/register" 
        : "/api/users/login";
        setIsLoading(true);
      
      const { data } = await axios.post(endpoint, formData);
      // console.log("Backend response:", data);
      console.log(data)
      // Store user data and token
      localStorage.setItem("userData", JSON.stringify({
        userId: data.userId,
        name: data.name,
        email: data.email, 
        token: data.token
      }));
      console.log('User data saved', localStorage.getItem("userData"));
      
      // Set authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      // Notify parent or redirect
      if (onAuthSuccess) {
        onAuthSuccess(data);
        setIsLoading(false)
      } else {
        navigate("/home");
      }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                          "Something went wrong";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <div className="text-center py-8">Loading...</div>;


  return (
    <div>
      <HomeNavbar/>
    <div className={`min-h-screen flex items-center justify-center ${isDark ? " text-white" : " text-green-900"}`}>
      <div className="p-8 max-w-md w-full shadow-lg rounded-lg bg-white dark:bg-green-800">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">
          {type === "signup" ? "Create Account" : "Welcome Back"}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded dark:bg-red-900 dark:text-red-100">
            {error}
          </div>
        )}
        
        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded dark:bg-green-900 dark:text-green-100">
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {type === "signup" && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm text-green-300 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg dark:bg-gray-300 dark:border-gray-600"
                required
              />
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-green-300 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-300 dark:border-gray-600"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-green-300 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-300 dark:border-gray-600"
              required
              minLength="6"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 cursor-pointer px-4 rounded-lg font-medium transition-colors ${
              isLoading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : type === "signup" ? (
              "Sign Up"
            ) : (
              "Login"
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          {type === "signup" ? (
            <p className="text-sm text-green-300">
              Already have an account?{" "}
              <a href="/login" className="text-green-600 hover:underline dark:text-green-400">
                Login here
              </a>
            </p>
          ) : (

            <p className="text-sm dark: text-green-500">
              Don't have an account?{" "}
              <a href="/signup" className="text-green-600 hover:underline dark:text-green-200">
                Sign up here
              </a>
              <ForgotPassword className="block text-sm text-green-300 font-medium mb-1" />
            </p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AuthForm;