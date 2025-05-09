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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${postId}`);
        setPost(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.content?.slice(0, 100) + "...",
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  if (loading) return <p className="text-center py-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div>
        <HomeNavbar/>
    <div className="max-w-3xl  mx-auto  shadow-md rounded-2xl p-6 mt-10 border border-gray-200">
      <h1 className="text-4xl  font-extrabold mb-3">{post.title}</h1>
      <p className=" mb-6">By {post.author?.name || "Unknown Author"}</p>

      <div
        className=" leading-relaxed whitespace-pre-line mb-6"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      <div className="flex items-center gap-6 border-t border-gray-200 pt-4">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-2 text-sm ${
            liked ? "text-red-500" : "text-gray-600 hover:text-red-500"
          }`}
        >
          <Heart fill={liked ? "red" : "none"} className="w-5 h-5" />
          {liked ? "Liked" : "Like"}
        </button>

        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-500">
          <MessageCircle className="w-5 h-5" />
          Comment
        </button>

        <button
          onClick={() => setSaved(!saved)}
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
    </div>
    </div>
  );
}

export default PostDetails;