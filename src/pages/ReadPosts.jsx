import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { supabase } from '../client'
import "./ReadPosts.css"

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);
    const [sortOption, setSortOption] = useState('recent'); 
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const searchPosts = (searchValue) => {
        setSearchInput(searchValue);
        if (!posts) return;
        if (searchValue !== "") {
            const filteredData = posts.filter((post) =>
                post.title.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(posts);
        }
    };

    useEffect(() => {
        console.log("Sort option:", sortOption);
        const sortField = sortOption === 'recent' ? 'created_at' : 'upvotes';
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('ChefHub')
                .select()
                .order(sortField, { ascending: false });

            setPosts(data);
            searchPosts(searchInput);
        }
        fetchPosts();
    }, [props, sortOption]);
    
    return (
        <div>
            <div className="sort-options">
                <label>
                    <input
                    type="radio"
                    name="sort"
                    value="recent"
                    checked={sortOption === 'recent'}
                    onChange={(e) => setSortOption(e.target.value)}
                    />
                    Most Recent
                </label>

                <label>
                    <input
                    type="radio"
                    name="sort"
                    value="popular"
                    checked={sortOption === 'popular'}
                    onChange={(e) => setSortOption(e.target.value)}
                    />
                    Most Popular
                </label>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search posts by title..."
                    value={searchInput}
                    onChange={(e) => searchPosts(e.target.value)}
                />
            </div>

            <div className="ReadPosts">
            {(searchInput ? filteredResults : posts).length > 0 ? (
                (searchInput ? filteredResults : posts).map((post) => (
                <Link to={`/post/${post.id}`} key={post.id} className="card-link">
                    <Card
                    id={post.id}
                    created_at={post.created_at}
                    title={post.title}
                    upvotes={post.upvotes}
                    />
                </Link>
                ))
            ) : (
                <h2 style={{ 
                    textAlign: 'center', 
                    marginTop: '40px', 
                    color: '#666', 
                    fontWeight: 'normal' 
                  }}>
                    No Posts Found 😞
                  </h2>
                  
            )}
            </div>
        </div>
      );
}

export default ReadPosts;