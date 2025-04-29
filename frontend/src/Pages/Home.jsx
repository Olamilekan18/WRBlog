import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import HomeNavbar from "../Components/homeNavbar";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
function Home() {

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData)
    if (userData?.name) setUserName(userData.name);

    // Fetch posts by user ID
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts?userId=${userData.id}`, {
          headers: {
            Authorization: `Bearer ${userData.token}`, // Pass the token for authentication
          },
        });
        setPosts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-green-500">
          <h2 className="text-3xl font-bold text-green-800">
            Welcome back, <span className="text-green-600">{userName || "Writer"}</span>!
          </h2>
          <p className="text-green-700 mt-2">
            {posts.length > 0
              ? "Here are your latest posts"
              : "You don't have any posts yet. Start writing your first post!"}
          </p>
        </div>

        {/* Blog Feed */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0,6).map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-8">
            <p>You don't have any posts yet. Start writing your first post!</p>
          </div>
        )}
<div className="flex   justify-center items-center mt-4">
  <button
  onClick={() => navigate("/all-posts")} // Navigate to the /all-posts route
  className="px-4 py-2 bg-green-500 cursor-pointer mt- 3 text-white rounded-lg hover:bg-green-600"
>
  See All Posts
</button>

<button
  onClick={() => navigate("/editor")} // Navigate to the /all-posts route
  className="px-4 py-2 bg-green-500 cursor-pointer ml-3 text-white rounded-lg hover:bg-green-600"
>
  Start Writing
</button>

</div>

        
      </div>
    </div>
  );
}

// Separate PostCard component for better organization
function PostCard({ post }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      {/* Post image placeholder - replace with actual image if available */}
      <div className="h-48 bg-green-200"></div>

      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-green-300 mr-2 flex items-center justify-center text-white font-bold">
            {post.author?.name?.charAt(0) || "A"}
          </div>
          <span className="text-green-800 font-medium">{post.author?.name || "Anonymous"}</span>
        </div>

        <h3 className="text-xl font-bold text-green-900 mb-2">{post.title}</h3>

        {/* Render HTML content */}
        <div
          className="text-green-700 mb-4"
          dangerouslySetInnerHTML={{
            __html: expanded
              ? post.content // Show full content if expanded
              : post.content.slice(0, 100) + (post.content.length > 100 ? "..." : ""), // Truncate content
          }}
        ></div>

        {/* See More / See Less Button */}
        {post.content.length > 100 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:underline"
          >
            {expanded ? "See Less" : "See More"}
          </button>
        )}

        <div className="flex justify-between items-center">
          <span className="text-sm text-green-600">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
            #{post.tags?.[0] || "General"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;