import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header>
      <h1>Blog App</h1>
      {isLoggedIn ? (
        <button onClick={() => {logout(); navigate('/')}}>Sign Out</button>
      ) : (
        <div>
          <Link to="/signup"><button>Sign Up</button></Link>
          <Link to="/login"><button>Log In</button></Link>
          <Link to="/"><button>Home</button></Link>
        </div>
      )}
    </header>
  );
};

export default Header;
