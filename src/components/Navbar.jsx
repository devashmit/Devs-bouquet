import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-brand" id="nav-brand">
          <span className="brand-icon">✿</span>
          <span className="brand-text">DevsBouquet</span>
        </Link>

        <div className="navbar-links">
          <Link to="/create" className="nav-link" id="nav-create">Create</Link>
          <Link to="/garden" className="nav-link" id="nav-garden">Garden</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link" id="nav-dashboard">Dashboard</Link>
              <div className="nav-user-menu">
                <button className="nav-avatar" id="nav-avatar" onClick={() => navigate('/profile')}>
                  {user?.displayName?.[0]?.toUpperCase() || '✿'}
                </button>
                <button className="btn btn-sm btn-soft" onClick={handleLogout} id="nav-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary" id="nav-login">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
