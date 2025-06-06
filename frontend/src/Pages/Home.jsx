import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "../Components/HomeNavbar.jsx";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

function Home() {
const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const id = userData.userId;
    if (userData?.name) setUserName(userData.name);

    // Fetch posts by user ID
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/posts/user/${id}`, {
          headers: {
            Authorization: `Bearer ${userData.token}`, 
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

  const handleDelete = async (postId) => {
    setLoading(true)
    const userData = JSON.parse(localStorage.getItem("userData"));

    try {
      await axios.delete(`${backendUrl}/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      setPosts(posts.filter((post) => post._id !== postId)); // Remove the deleted post from the state
      setLoading(false)
      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete post");
      setLoading(false)
    }
  };

  const handleEdit = (post) => {
    navigate(`/editor/${post._id}`, { state: { post } }); // Navigate to the editor page with the post data
  };

  const handlePost = (post) => {
    navigate(`/posts/${post._id}`, { state: { post } }); // Navigate to the post details page with the post data
  };



  if (loading)
    return (
      <div className="text-center py-8">
        <ClipLoader size={150} aria-label="Loading Spinner" data-testid="loader" color="#36d7b7" />
      </div>
    );

  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="min-h-screen">
      <ToastContainer />
      <HomeNavbar posts ={posts} />

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
            {posts.slice(0, 6).map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onDelete={handleDelete} 
                onEdit={handleEdit} 
                handlePost={handlePost}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-8">
            <p>You don't have any posts yet. Start writing your first post!</p>
          </div>
        )}
        <div className="flex   justify-center items-center mt-4">
  <button
  onClick={() => navigate("/all-posts")} 
  className="px-4 py-2 bg-green-500 cursor-pointer mt- 3 text-white rounded-lg hover:bg-green-600"
>
  See All Posts
</button>

<button
  onClick={() => navigate("/editor")} 
  className="px-4 py-2 bg-green-500 cursor-pointer ml-3 text-white rounded-lg hover:bg-green-600"
>
  Start Writing
</button>

</div>
      </div>
    </div>
  );
}

function PostCard({ post, onDelete, onEdit, handlePost }) {
  
 const [expanded, setExpanded] = useState(false);

  // Helper to get up to N words
  const getPreview = (content, wordLimit) => {
    const words = content.split(/\s+/);
    if (words.length <= wordLimit) return content;
    return words.slice(0, wordLimit).join(" ") + " ...";
  };

  const isLong = post.content.split(/\s+/).length > 20;

  // Show 20 words by default, 250 words if expanded
  const previewContent = expanded
    ? getPreview(post.content, 100)
    : getPreview(post.content, 20);

 

  return (
    <div className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      <div className="h-48 bg-green-200">
        <img
          src="https://img.freepik.com/free-photo/front-view-woman-with-book-collage_23-2150149037.jpg?semt=ais_hybrid&w=740"
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-green-300 mr-2 flex items-center justify-center text-white font-bold">
            {post.author?.name?.charAt(0) || "A"}
          </div>
          <span className="text-green-800 font-medium">{post.author?.name || "Anonymous"}</span>
        </div>

        <h3 className="text-xl font-bold text-green-900 mb-2">{post.title}</h3>

        <div
          className="text-green-700 mb-4"
          dangerouslySetInnerHTML={{
            __html: previewContent,
          }}
        ></div>

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:underline"
          >
            {expanded ? "See Less" : "Preview"}
          </button>
        )}

        <div className="flex justify-between items-center">
          <span className="text-sm text-green-600">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span onClick={()=>handlePost(post)} className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
           View Post
          </span>
          </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => onEdit(post)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(post._id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;