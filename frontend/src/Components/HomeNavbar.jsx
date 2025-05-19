import React, { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import "./search.css"; 
const HomeNavbar = ({posts}) => {
const { isDark, toggle } = useDarkMode();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  };

   const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData"); // Clear user data from localStorage
    navigate("/login"); // Redirect to login page
    // window.location.href = "/login"; 
  };

  const handleDashboard = () =>{
    navigate('/dashboard')
  }

  const handleViewPosts = () => {
    navigate("/all-posts");
  }

  const handleWritePost = () => {
    navigate("/editor");
  }

  const goHome = () =>{
    navigate('/home')
  }
  return (
    <nav className={`flex items-center justify-between p-4 border-b shadow-md transition-colors duration-300 ${
      isDark ? "bg-gray-900 text-white border-gray-700" : "bg-gray-100 text-green-700 border-green-300"
    }`}>
      <div className="text-xl font-bold"><button onClick={goHome}>WRBlog</button></div>

      <button
        onClick={toggle}
        className={`hidden cursor-pointer md:block p-2 rounded  ${
          isDark ? "border-gray-600 hover:bg-gray-700" : "border-green-300 hover:bg-green-200"
        }`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <div className="search-container">
  <input
    type="text"
    placeholder="Search posts by title..."
    value={searchQuery}
    onChange={handleSearchChange}
    className="search-input"
  />
  <button>
    <Search />
  </button>

  {/* Show search results only when there is a query */}
  {searchQuery && (
    <div className="search-results">
      {filteredPosts.length === 0 ? (
        <p>No posts found matching "{searchQuery}"</p>
      ) : (
        <ul>
          {filteredPosts.map((post) => (
            <li key={post._id} onClick={() => handlePostClick(post._id)}>
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )}
</div>

      <button
        className={`md:hidden ${isDark ? "text-white" : "text-green-700"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul className="hidden md:flex space-x-6">
        <li>
          <button
          onClick={handleViewPosts}
           className="border-b-2 border-transparent hover:border-green-500 transition">
            View Blogs
          </button>
        </li>
        <li>
          <button
          onClick={handleWritePost}
           className="border-b-2 border-transparent hover:border-green-500 transition">
            Write Blogs
          </button>
        </li>
      </ul>


      <div className="hidden md:flex space-x-4">
        <button onClick={handleLogout} className={`px-4 py-2 cursor-pointer border ${
          isDark ? "border-gray-600 hover:bg-gray-700" : "border-green-500 hover:bg-green-100"
        } rounded-lg`}>
          Log out
        </button>
        <button 
          onClick={handleDashboard}   
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
              <a href="/aboutUs" className="block text-lg border-b-2 border-transparent hover:border-green-500">
                About Us
              </a>
            </li>
            <li>
              <a href="/all-posts" className="block text-lg border-b-2 border-transparent hover:border-green-500">
                View Blogs
              </a>
            </li>
            <li>
              <a href="/contact" className="block text-lg border-b-2 border-transparent hover:border-green-500">
                Contact
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <button onClick={handleLogout} className={`w-full py-2 cursor-pointer border ${
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