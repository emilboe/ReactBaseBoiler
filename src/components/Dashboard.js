import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }
  return (
    <>
      <h1>Dashboard</h1>
      <p>Email: {currentUser.email}</p>
      <button className="red"onClick={handleLogout}>Log out</button>
      <br />
      <Link to="/update-profile"><button className="green">Update Profile</button></Link>
    </>
  )

}
