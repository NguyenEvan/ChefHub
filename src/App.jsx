import './App.css';
import React from 'react';
import { useState } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import ReadPosts from './pages/ReadPosts';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost'
import ViewPost from './pages/ViewPost'

const App = () => {
  const posts = [];

  let element = useRoutes([
    {
      path: "/",
      element: <ReadPosts data={posts} />
    },
    {
      path: "/new", 
      element: <CreatePost />
    },
    {
      path: "/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path: "/post/:id",
      element: <ViewPost data={posts} />
    }
  ]);

  return (
    <div className="App">
      <div className="header">
        <div className="header-title">Welcome to ChefHub 👨‍🍳👩‍🍳</div>
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/new">Create New Post</Link>
        </div>
    </div>

      <div className="page-content">
        {element}
      </div>
    </div>
  );
};

export default App;
