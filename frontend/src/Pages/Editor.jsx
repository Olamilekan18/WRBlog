import { useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import HomeNavbar from '../Components/homeNavbar.jsx';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Editor() {
  const post = location.state?.post||null
  const [title, setTitle] = useState(post?.title||" ");
  const [content, setContent] = useState(post?.content || "");
  const [error,setError] = useState(false)
  const [loading,setLoading] = useState(false)

  const quillRef = useRef();
  const navigate = useNavigate()
  // const post = location.state?.post||null

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        try {
          const res = await fetch("http://localhost:5000/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          const imageUrl = data.imageUrl;

          const editor = quillRef.current.getEditor();
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, "image", imageUrl);
        } catch (err) {
          console.error("Upload failed", err);
        }
      }
    };
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["blockquote", "code-block"],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [] 
  );
  

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'color', 'background', 'list', 'bullet', 'align', 'link', 'image', 'video',
  ];

  const handleSubmit = async () => {
    setLoading(true)
    const postData = {
        title,
       content
      };
      console.log(postData);
      const userData = JSON.parse(localStorage.getItem("userData"));
      console.log(userData)
      const token = userData.token; 
      if (!token) {
        setError(true)
        console.error('No token found. Please log in.');
        toast.error("No token found,l please log in again")
        return;
      }
      try {
        const url = post
        ? `http://localhost:5000/api/posts/${post._id}` // Update existing post
        : "http://localhost:5000/api/posts"; // Create new post

        const method = post ? "PUT" : "POST"; 

        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        });

       
        if (res.ok) {
            const result = await res.json();
            console.log('Post submitted successfully:', result);
            setLoading(false)
            navigate("/home")
        } else if (res.status === 401) {
            console.error('Unauthorized. Please log in again.');
            setLoading(false)
            toast.error("Unauthorized. Please log in again.")
            navigate("/login")
            // Optionally, redirect to login page or show a message
        } else {
            console.error('Failed to submit post');
            setLoading(false)
        }
    } catch (error) {
      setError(true)
      setLoading(false)
        console.error('Error:', error);
    }

    if (loading) return <div className="text-center py-8">  <ClipLoader
  size={150}
  aria-label="Loading Spinner"
  data-testid="loader"
  color="#36d7b7"
  display = "block"
/></div>;

    }
  

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToastContainer/>
      
      <HomeNavbar className = "mt-4"/>
      <input
        type="text"
        placeholder="Enter Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 mt-4 p-2 border rounded"
      />

      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        className="bg-white"
      />

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
      >
      {post? "Update Post"  : "Post Blog"}
      </button>
{error && <p className='text-red-500'>Please login to post</p>}
      {/* Fix: Editor height */}
      <style>
        {`
          .ql-editor {
            min-height: 300px;
          }
        `}
      </style>
    </div>
  );
}
