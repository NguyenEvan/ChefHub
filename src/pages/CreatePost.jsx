import React, { useState } from 'react';
import './CreatePost.css';
import { supabase } from '../client';


const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    image_url: "",
  });

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const createPost = async (event) => {
    event.preventDefault();

    if (!post.title.trim()) {
        alert("Title is required!");
        return;
    }

    await supabase
      .from("ChefHub")
      .insert(post)
      .select();

    window.location = "/";
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Post</h2>
      <form onSubmit={createPost}>
        <div className="form-row">
          <label htmlFor="title">Title (required):</label><br />
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="content">Content (optional):</label><br />
          <textarea
            id="content"
            name="content"
            rows="4"
            value={post.content}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="image_url">Image URL (optional):</label><br />
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={post.image_url}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value="Create Post" />
      </form>
    </div>
  );
};


export default CreatePost;
