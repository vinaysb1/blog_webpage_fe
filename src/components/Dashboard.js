import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null); // State to track the post being edited

  useEffect(() => {
    fetchPosts(); // Fetch posts when component mounts
  }, []);

  const fetchPosts = async () => {
    try {
      const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
      const response = await axios.get('http://localhost:4001/api/posts', {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      });
      console.log(response)
      setPosts(response.data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4001/api/posts', { title, content, author });
      setTitle('');
      setContent('');
      setAuthor('');
      fetchPosts();
      console.log(response.data.post) // Fetch updated posts after creating a new post
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:4001/api/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdate = async (postId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:4001/api/posts/${postId}`, updatedData);
      const updatedPost = response.data.post;
      setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
      setEditingPostId(null); // Reset editing state
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Create Post</button>
      </form>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          {editingPostId === post.id ? (
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <button onClick={() => handleUpdate(post.id, { title, content, author })}>Save</button>
            </div>
          ) : (
            <div>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>Author: {post.author}</p>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
              <button onClick={() => setEditingPostId(post.id)}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
