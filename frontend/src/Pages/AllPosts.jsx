import { useEffect, useState } from "react";
import axios from "axios";
import HomeNavbar from "../Components/homeNavbar";
import { ClipLoader } from "react-spinners";

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

  function randomAvavtar(){
    const avatars = [
      "https://img.freepik.com/free-photo/front-view-woman-with-book-collage_23-2150149037.jpg?semt=ais_hybrid&w=740",
      "https://www.shutterstock.com/image-vector/woman-holds-open-book-studies-260nw-2200880419.jpg",
      "https://static.vecteezy.com/system/resources/previews/008/088/774/non_2x/girl-lies-on-on-stack-of-big-books-with-open-book-in-her-hands-literature-fan-concept-illustration-of-earning-distance-studying-young-woman-study-in-library-literary-club-illustration-vector.jpg",
    ]
    
  }

  if (loading) return <div className="text-center py-8">  <ClipLoader
  size={150}
  aria-label="Loading Spinner"
  data-testid="loader"
  color="#36d7b7"
  display = "block"
/></div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="min-h-screen ">
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
  
  const [expanded, setExpanded] = useState(false)
    return (
      <div className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
        {/* Post image placeholder - replace with actual image if available */}
        <div className="h-48 bg-green-200">
          {/* Post image */}
          <img src="https://img.freepik.com/free-photo/front-view-woman-with-book-collage_23-2150149037.jpg?semt=ais_hybrid&w=740" alt={post.title} className="w-full h-full object-cover" />
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-green-300 mr-2 flex items-center justify-center text-white font-bold">
              {post.author?.name?.charAt(0) || "A"}
            </div>
            <span className="text-green-800 font-medium">
              {post.author?.name || "Anonymous"}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-green-900 mb-2">{post.title}</h3>
          
            {/* Truncated or Full Content */}
        <div
          className="text-green-700 mb-4"
          dangerouslySetInnerHTML={{
            __html: expanded
              ? post.content // Show full content if expanded
              : post.content.slice(0, 100) + (post.content.length > 100 ? "..." : ""), // Truncate content
          }}>
            </div>          

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
  
export default AllPosts;