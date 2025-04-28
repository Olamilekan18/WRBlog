import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const quillRef = useRef();

//   const imageHandler = (e) => {
//     const editor = quillRef.current.getEditor();
//     console.log(editor)
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       if (/^image\//.test(file.type)) {
//         console.log(file);
//         const formData = new FormData();
//         formData.append("image", file);
//         const res = await ImageUpload(formData); // upload data into server or aws or cloudinary
//         const url = res?.data?.url;
//         editor.insertEmbed(editor.getSelection(), "image", url);
//       } else {
//         ErrorToast('You could only upload images.');
//       }
//     };
//   }
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      handlers: {
        // image: imageHandler,
      },
    },
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'color', 'background', 'list', 'bullet', 'align', 'link', 'image', 'video',
  ];

  const handleSubmit = () => {
    console.log({ title, content });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <input
        type="text"
        placeholder="Enter Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
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
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
       Post Blog
      </button>

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
