import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn')==='true');
const navigate = useNavigate();

  const login = (token ) => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', true);
    sessionStorage.setItem('token', token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.setItem('isLoggedIn', false);
    sessionStorage.removeItem('token');
      navigate('/login') 
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
