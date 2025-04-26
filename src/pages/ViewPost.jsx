import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import './ViewPost.css';

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from('ChefHub')
        .select()
        .eq('id', id)
        .single(); // grab one post

      setPost(data);
    };

    fetchPost();
  }, [id]);

  const handleUpvote = async () => {
    const { data, error } = await supabase
      .from('ChefHub')
      .update({ upvotes: post.upvotes + 1 })
      .eq('id', id)
      .select()
      .single();

    if (!error) setPost(data);
  };

  const handleAddComment = async (e) => {
    if (e.key === 'Enter' && commentInput.trim()) {
      const updatedComments = [...(post.comments || []), commentInput.trim()];
  
      const { data, error } = await supabase
        .from('ChefHub')
        .update({ comments: updatedComments })
        .eq('id', id)
        .select()
        .single();
  
      if (!error) {
        setPost(data);
        setCommentInput(""); // clear input
      }
    }
  };

  const deletePost = async (event) => {
    event.preventDefault();
    await supabase
        .from('ChefHub')
        .delete()
        .eq('id', id); 
    
    window.location = "/";
  }
  

  if (!post) return <h2 style={{ textAlign: 'center' }}>Loading post...</h2>;

  const timeSince = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 1000);
    if (diff < 60) return 'Just now';
    const mins = Math.floor(diff / 60);
    const hours = Math.floor(mins / 60);
    if (hours < 1) return `${mins} minute${mins === 1 ? '' : 's'} ago`;
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    return `${Math.floor(hours / 24)} day(s) ago`;
  };

  return (
    <div className="post-wrapper">
      <div className="post-card">
  
        {/* Post content box with border */}
        <div className="post-content-box">
          <p className="timestamp">Posted {timeSince(post.created_at)}</p>
          <h2 className="post-title">{post.title}</h2>
          {post.content && <p className="post-content">{post.content}</p>}
          {post.image_url && (
            <img
              src={post.image_url}
              className="post-image"
              alt="Post Visual"
            />
          )}
        </div>
        <div className="interactions">
            <button className="icon-button" onClick={handleUpvote}>🔥</button>
            <span>{post.upvotes} upvotes</span>
        </div>

        {/* Comments section */}
        <div className="comments-section">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment, index) => (
              <p key={index} className="comment">- {comment}</p>
            ))
          ) : (
            <p className="no-comments">No comments yet 😶</p>
          )}
  
            <input
                type="text"
                className="comment-input"
                placeholder="Leave a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={handleAddComment}
            />

        </div>
  
        {/* Edit & delete buttons */}
        <div className="post-actions">
          <Link to={`/edit/${post.id}`}>
            <button className="icon-button">✏️</button>
          </Link>
          <button className="icon-button" onClick={deletePost}>🗑️</button>
        </div>
      </div>
    </div>
  );
  
};

export default ViewPost;
