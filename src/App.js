// App.js
import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { AuthProvider} from './components/AuthContext';
import Header from './components/Header';
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard'
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/dashboard" element={<Dashboard/>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
