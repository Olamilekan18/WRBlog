import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HomeNavbar from "../Components/homeNavbar";
import { ToastContainer, toast } from "react-toastify";
import {
  Heart,
  MessageCircle,
  Bookmark,
  BookmarkCheck,
  Share2,
} from "lucide-react";

function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData")) || {};

useEffect(() => {
  const fetchPostAndComments = async () => {
    try {
      setLoading(true);
      
      console.log(`Fetching post ${postId} and comments`);
      // Fetch post and comments separately 
      const postResponse = await axios.get(`http://localhost:5000/api/posts/${postId}`);
      console.log('Post response:', postResponse.data);
      
      const commentsResponse = await axios.get(`http://localhost:5000/api/posts/${postId}/comments`);
      console.log('Comments response:', commentsResponse.data);
      
      setPost(postResponse.data);
      
      let fetchedComments = [];
      
      if (Array.isArray(commentsResponse.data)) {
        // Case 1: Direct array of comments
        fetchedComments = commentsResponse.data;
      } else if (commentsResponse.data?.comments) {
        // Case 2: Object with comments array
        fetchedComments = commentsResponse.data.comments;
      } else if (commentsResponse.data?.data) {
        // Case 3: Object with data containing comments
        fetchedComments = commentsResponse.data.data;
      }
      // Ensure each comment has a user object
      setComments(fetchedComments.map(comment => ({
        ...comment,
        user: comment.user || { _id: null, name: "Anonymous" }
      })));
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.response?.data?.message || "Error fetching data");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  fetchPostAndComments();
}, [postId]);

useEffect(() => {
  const trackView = async () => {
    try {
      await axios.post(`http://localhost:5000/api/posts/${postId}/view`);
    } catch (err) {
      console.error("View tracking failed:", err);
    }
  };

  if (postId) {
    trackView();
  }
}, [postId]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.content?.slice(0, 100) + "...",
        url: window.location.href,
      });
    } else {
      toast.error("Sharing not supported on this browser.");
    }
  };

  const handleLike = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData")); 
    
      if (!userData?.token) {
        toast.error("Please login to like posts");
        return;
      }
  
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
  
      setPost(prevPost => ({
        ...prevPost,
        likes: response.data.likes,
      }));
      
      setLiked(response.data.liked);
      toast.success(response.data.liked ? "Post liked!" : "Like removed");
    } catch (error) {
      console.error("Error liking post:", error);
      
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again");
      } else {
        toast.error("Failed to like the post");
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!newComment.trim()) {
        toast.error("Comment cannot be empty");
        return;
      }
  
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comments`,
        { content: newComment },
        {
          headers: {
            "Authorization": `Bearer ${userData.token}`,
            "Content-Type": "application/json"
          }
        }
      );
  
      // Handle different possible successful response structures
      let newCommentData;
      if (response.data.comment) {
        newCommentData = response.data.comment;
      } else if (response.data.data) {
        newCommentData = response.data.data;
      } else {
        newCommentData = response.data;
      }
  
      // Ensure the new comment has a user object
      const commentWithUser = {
        ...newCommentData,
        user: newCommentData.user || {
          _id: userData.userId,
          name: userData.name || "You"
        }
      };
  
      setComments([commentWithUser, ...comments]);
      setNewComment("");
      toast.success("Comment added!");
    } catch (error) {
      console.error("Comment submission error:", error);
      toast.error(error.response?.data?.message || "Failed to add comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
  try {
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    if (!userData?.token) {
      toast.error("Please login to delete comments");
      return;
    }

    console.log("Attempting to delete comment:", commentId); // Debug log
    
    const response = await axios.delete(
      `http://localhost:5000/api/posts/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );

    console.log("Delete response:", response.data); // Debug log
    
    if (response.data.success) {
      setComments(comments.filter(comment => comment._id !== commentId));
      toast.success("Comment deleted successfully");
    } else {
      throw new Error(response.data.message || "Failed to delete comment");
    }
  } catch (error) {
    console.error("Full error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again");
    } else if (error.response?.status === 403) {
      toast.error("You can only delete your own comments");
    } else if (error.response?.status === 404) {
      toast.error("Comment not found");
    } else {
      toast.error(error.response?.data?.message || "Failed to delete comment");
    }
  }
};
const handleSavePost = async () => {
  setSaved(!saved);
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData?.token) {
    toast.error("Please login to save posts");
    return;
  }

  try {
    const response = await axios.post(
      `http://localhost:5000/api/users/${postId}/save`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      }
    );
    setSaved(response.data.saved);
    toast.success("Post saved!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to save post");
  }
};


  if (loading) return <p className="text-center py-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} 
        closeOnClick pauseOnHover draggable pauseOnFocusLoss theme="light" />
      <HomeNavbar/>
      
      <div className="max-w-3xl mx-auto shadow-md rounded-2xl p-6 mt-10 border border-gray-200">
        <h1 className="text-4xl font-extrabold mb-3">{post.title}</h1>
        <p className="mb-6">By {post.author?.name || "Unknown Author"}</p>

        <div
          className="leading-relaxed whitespace-pre-line mb-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        <div className="flex items-center gap-6 border-t border-gray-200 pt-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 text-sm ${
              liked ? "text-red-500" : "text-gray-600 hover:text-red-500"
            }`}
          >
            <Heart fill={liked ? "red" : "none"} className="w-5 h-5" />
            {liked ? "Liked" : "Like"} ({post.likes || 0})
          </button>

          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-500"
          >
            <MessageCircle className="w-5 h-5" />
            Comment ({comments.length})
          </button>

          <button
          onClick ={handleSavePost}
            // onClick={() => setSaved(!saved)}
            className={`flex items-center gap-2 text-sm ${
              saved ? "text-yellow-600" : "text-gray-600 hover:text-yellow-600"
            }`}
          >
            {saved ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
            {saved ? "Saved" : "Save"}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-500"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                required
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Post Comment
              </button>
            </form>

{/* Comments List */}
<div className="space-y-4">
  {comments.length === 0 ? (
    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
  ) : (
    comments.map((comment) => {
      // Ensure createdAt exists
      const commentDate = comment.createdAt 
        ? new Date(comment.createdAt)
        : new Date();
        
      return (
        <div key={comment._id || Math.random()} className="p-4  rounded-lg border-b border-gray-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">
                {comment.user?.name || "Anonymous"}
              </p>
              <p className=" mt-1">{comment.content}</p>
            </div>
            {
  comment.user?._id && userData?.userId && comment.user._id === userData.userId && (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteComment(comment._id);
      }}
      className="text-red-500 hover:text-red-700 text-sm"
    >
      Delete
    </button>
  )
}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {commentDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      );
    })
  )}
</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetails;