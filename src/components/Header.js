// components/Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <h1>Blog App</h1>
      {user ? (
        <button onClick={handleLogout}>Sign Out</button>
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
