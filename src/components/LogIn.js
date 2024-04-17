import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth hook

const LogIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from useAuth hook
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://blog-webpage-be.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      debugger;
      if (response.ok) {
        // Login successful
        sessionStorage.setItem('token', data.token);
        login(data.token); // Call login function from useAuth hook
        navigate('/dashboard');
      } else {
        // Login failed
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LogIn;
