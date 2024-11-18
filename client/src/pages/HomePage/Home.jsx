import React from 'react';
import "./Home.css";
import { NavLink } from 'react-router-dom';

const Home = () => {
    
  return (
    <div className='home-container'>
      {/* Navigation Bar */}
      <div className='navbar'>
        <div className='logo'>
          Employee Management System
        </div>
        <div className='nav-links'>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/login/admin">Admin Login</NavLink></li>
            <li><NavLink to="/login/user">User Login</NavLink></li>
            {/* <li><NavLink to="/login">Login</NavLink></li> */}
            
          </ul>
        </div>
      </div>

      {/* Hero Section */}
      <div className='headingContainer'>
        <h1>Welcome to the Employee Management System</h1>

      </div>
    </div>
  );
}

export default Home;
