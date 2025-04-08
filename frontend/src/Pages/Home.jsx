import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '../Components/homeNavbar';

import axios from 'axios';

function Home() {
  const [userName, setUserName] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const [randomQuote, setRandomQuote] = useState('');
  const navigate = useNavigate();
 
  // Fetch data on component mount
  useEffect(() => {
    // Get user data
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
    console.log("gotten user data")
    // if (!userData?.id) {
    //     console.error('No user ID found');
    //     return; // Exit if no user ID
    //   }
   
    if (userData?.name) setUserName(userData.name);

    // Fetch user's posts
    const fetchUserPosts = async () => {
      try {
     
        const userId = localStorage.getItem('userId');
        console.log(userId)
      
        const res = await axios.get(`/api/posts/user/67f45c85bfdf82a9ed4c6016` );
        console.log("ko ye mi oo")
        setUserPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch user posts', err);
      }
    };

    // Get random quote
    const quotes = [
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Write what should not be forgotten. - Isabel Allende"
    ];
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    fetchUserPosts();
  }, []);

  return (
    <div className="min-h-screen bg-green-50">
      <HomeNavbar />
    <div className="welcome mt-4 ml-3">Welcome, <b>{userName}</b></div>
      <div className="container mx-auto px-4 py-8">
        {/* Random Quote Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8 text-center italic">
          "{randomQuote}"
        </div>

        {/* Start Writing CTA */}
        <div className="text-center mb-12">
          <button 
            onClick={() => navigate('/create-post')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition"
          >
            Start Writing
          </button>
        </div>

        {/* User's Posts (Horizontal Scroll) */}
        {userPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Your Recent Posts</h2>
            <div className="flex overflow-x-auto gap-4 pb-4">
              {userPosts.map(post => (
                <div key={post._id} className="flex-shrink-0 w-64 h-32 bg-white rounded-lg shadow p-4">
                  <h3 className="font-bold text-green-800">{post.title}</h3>
                  <p className="text-sm text-green-600 line-clamp-2">{post.content}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {post.tags?.map(tag => (
                      <span key={tag} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explore All Posts Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/explore')}
            className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 px-6 rounded-lg transition"
          >
            Explore All Posts →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;