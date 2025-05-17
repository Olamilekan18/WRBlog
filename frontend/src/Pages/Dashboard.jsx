import { useEffect, useState } from "react";
import axios from "axios";
import HomeNavbar from "../Components/HomeNavbar.jsx";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]); 
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStats = async () => {
      const userData = JSON.parse(localStorage.getItem("userData")); 
      try {
        const response = await axios.get(`${backendUrl}/api/users/dashboard`, {
          headers: {
            Authorization: `Bearer ${userData.token}`, 
          },
        });

        setStats(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
 

  useEffect(() => {
    const fetchSavedPosts = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
  
      try {
        const res = await axios.get(`${backendUrl}/api/users/user/saved-posts`, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });
  
        setSavedPosts(res.data.savedPosts);
      } catch (err) {
        console.error("Failed to load saved posts", err);
      }
    };
  
    fetchSavedPosts();
  }, []);
  


  if (loading)
    return (
      <div className="text-center py-8">
        <ClipLoader size={150} aria-label="Loading Spinner" data-testid="loader" color="#36d7b7" />
      </div>
    );

  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

    return (
      <div className="min-h-screen">
        <HomeNavbar />
        <div className="p-6 min-h-screen text-gray-800 max-w-7xl mx-auto">
          
          
          <h1 className="text-3xl text-green-600 font-bold mb-6">📊 Your Blog Dashboard</h1>
    
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <SummaryCard title="Total Posts" value={stats.totalPosts} />
            <SummaryCard title="Total Likes" value={stats.totalLikes} />
            <SummaryCard title="Unique Viewers" value={stats.uniqueViewers} />
          </div>
    
          <div>
            <h2 className="text-xl text-green-600 font-semibold mb-4">📝 Recent Posts</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stats.postStats.map((post, index) => (
                <PostCard key={index} post={post} />
              ))}
            </div>
          </div>
    
          
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-green-700">Your Saved Posts</h2>
    
            {Array.isArray(savedPosts) && savedPosts.length === 0 ? (
              <p className="text-gray-600">You haven't saved any posts yet.</p>
            ) : (
              <div
              
               className="grid grid-cols-1 cursor-pointer sm:grid-cols-2 gap-4">
                {savedPosts.map((post) => (
                  <div key={post._id} onClick={()=>navigate(`/posts/${post._id}`)} className="border p-4 rounded-lg shadow bg-white hover:shadow-neutral-500 ">
                    <p>{post.title}</p>
                    <div
                      className="text-gray-800 prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Posted on {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
    
        </div>
      </div>
    );
    
}

const SummaryCard = ({ title, value }) => (
  <div className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-md transition">
    <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

const PostCard = ({ post }) => (
  <div className="bg-white rounded-2xl shadow p-5 hover:shadow-md transition flex flex-col justify-between">
    <div>
      <h3 className="font-semibold text-lg mb-2 text-gray-800">{post.title}</h3>
      <p className="text-sm text-gray-500">
        Created: {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
    <div className="mt-4 flex justify-between text-sm text-gray-600">
      <span>👍 {post.likes} Likes</span>
      <span>👁️ {post.uniqueViewers} Views</span>
    </div>
  </div>
);

export default Dashboard;