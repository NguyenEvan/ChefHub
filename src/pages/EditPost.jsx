import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client'
import './EditPost.css'

const EditPost = ({data}) => {

    const {id} = useParams();
    const [post, setPost] = useState({
        title: "",
        content: "",
        image_url: "",
    });
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
          .from('ChefHub')
          .update({ title: post.title, content: post.content, image_url: post.image_url})
          .eq('id', id);
      
        window.location = "/";
    }

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase
          .from('ChefHub')
          .delete()
          .eq('id', id); 
      
        window.location = "/";
    }

    return (
    <div className="edit-post-container">
        <h2>Update Your Post</h2>
        <form onSubmit={updatePost}>
            <div className="form-row">
            <label htmlFor="title">Title (required):</label><br/>
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

            <input type="submit" value="Edit Post" onClick={updatePost}/>
            <button type="button" className="deleteButton" onClick={deletePost}>Delete</button>
        </form>
    </div>
    );

    
}

export default EditPost