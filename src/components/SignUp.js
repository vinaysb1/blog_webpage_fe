// components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4001/api/signup', formData);
      console.log(response.data); // Handle success response from the backend
     navigate('/login')
    } catch (error) {
      console.error('Error signing up:', error.response.data.error);
      // Handle error response from the backend
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

