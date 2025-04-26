import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = (props) => {
  const getTimeAgo = (timestamp) => {
    const postDate = new Date(timestamp);
    const now = new Date();
    const diffMs = now - postDate;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) return `Just now`;
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  };

  return (
    <div className="Card">
      <Link to={`/post/${props.id}`} className="card-link">
        <h2 className="title">{props.title}</h2>

        <div className="info">
          <p><strong>Posted:</strong> {getTimeAgo(props.created_at)}</p>
          <p><strong>Upvotes:</strong> {props.upvotes}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
