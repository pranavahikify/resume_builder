import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Sparkles, LayoutTemplate, FileEdit, DownloadCloud, User, LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../lib/supabase';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  // Derive the greeting name from Supabase profile or user metadata
  const firstName = (
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email ||
    'User'
  ).split(' ')[0];

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      {/* Top Navbar */}
      <nav className="dashboard-nav glass-card">
        <div className="nav-brand">
          <Sparkles className="logo-icon" size={24} />
          <span className="brand-text">ResumeAI App</span>
        </div>

        <div className="nav-links">
          <NavLink to="/app/builder" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <FileEdit size={18} /> Resume Builder
          </NavLink>
          <NavLink to="/app/templates" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <LayoutTemplate size={18} /> Templates
          </NavLink>
          <NavLink to="/app/downloads" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <DownloadCloud size={18} /> Downloads
          </NavLink>
          <NavLink to="/app/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <User size={18} /> Profile
          </NavLink>
        </div>

        <div className="nav-actions">
          <span className="user-greeting">Hi, {firstName}</span>
          <button onClick={handleLogout} className="btn-icon" title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
