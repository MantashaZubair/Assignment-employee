import React from 'react'
import { NavLink } from 'react-router-dom'
import { handleSuccess } from '../utils'


const UserMenu = () => {
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8082/api/v8/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
  
      // Clear any other localStorage data
      localStorage.removeItem("token");
      localStorage.removeItem("userAdmin");
      localStorage.removeItem("username");
      localStorage.removeItem("user");
  
      handleSuccess('User Logged out');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  

  return (
    <>
      <h2>User Menu</h2>
      <ul>
        <li><NavLink to="/dashboard/user" >Dashboard</NavLink></li>
        <li><NavLink to="/dashboard/user/profile">Profile</NavLink></li>
        <li><NavLink to="/login" onClick={handleLogout}>Logout</NavLink></li>
      </ul>
    </>
  )
}

export default UserMenu;
