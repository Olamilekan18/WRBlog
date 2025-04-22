import { useEffect, useState } from "react";
import axios from "axios";
import HomeNavbar from "../Components/homeNavbar";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all posts
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center py-8">Loading posts...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <HomeNavbar />

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-green-800 mb-6">All Posts</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Reuse the PostCard component
function PostCard({ post }) {
  return (
    <div className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      <div className="h-48 bg-green-200"></div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-green-900 mb-2">{post.title}</h3>
        <p className="text-green-700 mb-4 line-clamp-2">{post.content}</p>
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

export default AllPosts;