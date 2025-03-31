import React from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { User, CalendarDays, Clock } from "lucide-react";

const FeaturedPostsSection = () => {
  const { isDark } = useDarkMode();

  const featuredPosts = [
    {
      id: 1,
      title: "The Art of Storytelling in Modern Blogging",
      excerpt: "Discover how to craft compelling narratives that captivate your audience and keep them coming back for more.",
      author: "Sarah Johnson",
      date: "May 15, 2024",
      readTime: "5 min read",
      category: "Writing Tips"
    },
    {
      id: 2,
      title: "Optimizing Your Content for Search Engines",
      excerpt: "Practical SEO techniques to help your blog posts rank higher and reach a wider audience.",
      author: "Michael Chen",
      date: "June 2, 2024",
      readTime: "8 min read",
      category: "Marketing"
    },
    {
      id: 3,
      title: "Building a Loyal Reader Community",
      excerpt: "Strategies to engage your audience and turn casual readers into dedicated followers.",
      author: "Emma Rodriguez",
      date: "June 10, 2024",
      readTime: "6 min read",
      category: "Community"
    },
    {
        id: 4,
      title: "Building a full stack app",
        excerpt: "Learn how to build a full stack application using React and Express.js.",
        author: "Olamilekan Kareem",
        date: "July 15, 2024",
        readTime: "4 min read",
        category: "Tech"
  
    },
    {
        id: 5,
      title: "Building a full stack app",
        excerpt: "Learn how to build a full stack application using React and Express.js.",
        author: "Olamilekan Kareem",
        date: "July 15, 2024",
        readTime: "4 min read",
        category: "Tech"
  
    },
    {
        id: 6,
      title: "Building a full stack app",
        excerpt: "Learn how to build a full stack application using React and Express.js.",
        author: "Olamilekan Kareem",
        date: "July 15, 2024",
        readTime: "4 min read",
        category: "Tech"
  
    }
  ];

  return (
    <section className={`py-16 px-4 transition-colors duration-300 ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-green-700"}`}>
            Featured Posts
          </h2>
          <p className={`text-lg ${isDark ? "text-gray-300" : "text-green-600"}`}>
            Discover our most engaging content
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <article 
              key={post.id}
              className={`rounded-xl cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg ${
                isDark 
                  ? "bg-gray-700 hover:bg-gray-600 border border-gray-600" 
                  : "bg-white hover:bg-green-50 border border-green-100"
              }`}
            >
              <div className="p-6">
                <div className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
                  isDark 
                    ? "bg-green-900 text-green-300" 
                    : "bg-green-100 text-green-700"
                }`}>
                  {post.category}
                </div>
                
                <h3 className={`text-xl font-semibold mb-3 ${
                  isDark ? "text-white" : "text-green-800"
                }`}>
                  {post.title}
                </h3>
                
                <p className={`mb-4 ${isDark ? "text-gray-300" : "text-green-600"}`}>
                  {post.excerpt}
                </p>
                
                <div className="flex items-center mt-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    isDark 
                      ? "bg-gray-600 text-green-300" 
                      : "bg-green-100 text-green-600"
                  }`}>
                    <User size={20} />
                  </div>
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : "text-green-800"}`}>
                      {post.author}
                    </p>
                    <div className="flex text-sm space-x-3">
                      <span className={`flex items-center ${isDark ? "text-gray-400" : "text-green-600"}`}>
                        <CalendarDays size={14} className="mr-1" />
                        {post.date}
                      </span>
                      <span className={`flex items-center ${isDark ? "text-gray-400" : "text-green-600"}`}>
                        <Clock size={14} className="mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPostsSection;