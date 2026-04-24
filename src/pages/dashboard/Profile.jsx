import React, { useState, useEffect } from 'react';
import { User, Moon, Sun, LogOut, Mail, Shield, Download, FileText, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signOut, getDownloadHistory } from '../../lib/supabase';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();

  const [theme, setTheme] = useState(
    document.documentElement.getAttribute('data-theme') || 'light'
  );
  const [rgbActive, setRgbActive]     = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);
  const [signingOut, setSigningOut]   = useState(false);

  // ── Fetch real download count from Supabase ────────────────────────────────
  useEffect(() => {
    if (!user?.id) return;
    getDownloadHistory(user.id).then(({ data }) => {
      setDownloadCount(data?.length ?? 0);
    });
  }, [user?.id]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLogout = async () => {
    setSigningOut(true);
    await signOut();
    navigate('/');
  };

  // Derive display values from real Supabase data
  const displayName  = profile?.full_name || user?.user_metadata?.full_name || 'Your Name';
  const displayEmail = profile?.email     || user?.email || '—';
  const initials     = displayName !== 'Your Name'
    ? displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  if (authLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <Loader2 size={36} style={{ color: 'var(--accent-color)', animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h2 className="section-title">My Profile</h2>

      <div className="profile-grid">
        {/* ── Left Card: Avatar + Info ── */}
        <div className="profile-main-card glass-card">

          {/* RGB Avatar */}
          <div
            className={`avatar-wrapper ${rgbActive ? 'rgb-spin' : ''}`}
            onMouseEnter={() => setRgbActive(true)}
            onMouseLeave={() => setRgbActive(false)}
          >
            <div className="avatar-rgb-ring" />
            <div className="avatar-inner">
              {displayName !== 'Your Name' ? (
                <span className="avatar-initials">{initials}</span>
              ) : (
                <User size={44} />
              )}
            </div>
          </div>

          <h3 className="profile-name">{displayName}</h3>
          <p className="profile-email">
            <Mail size={14} /> {displayEmail}
          </p>

          <div className="profile-badges">
            <span className="profile-badge">
              <Shield size={12} /> Pro Member
            </span>
            <span className="profile-badge">
              <FileText size={12} /> Resume Builder
            </span>
          </div>

          {/* Stats row */}
          <div className="profile-stats">
            <div className="stat-box">
              <span className="stat-number">{downloadCount}</span>
              <span className="stat-label">Downloads</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-box">
              <span className="stat-number">9</span>
              <span className="stat-label">Templates</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-box">
              <span className="stat-number">∞</span>
              <span className="stat-label">Resumes</span>
            </div>
          </div>
        </div>

        {/* ── Right Card: Settings + Logout ── */}
        <div className="profile-settings-col">

          {/* Preferences Card */}
          <div className="profile-settings-card glass-card">
            <h4 className="settings-card-title">Preferences</h4>

            <div className="settings-row">
              <div className="settings-row-left">
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                <div>
                  <span className="settings-label">Theme Mode</span>
                  <p className="settings-sub">Toggle dark / light interface</p>
                </div>
              </div>
              <button className="toggle-switch" onClick={toggleTheme} aria-label="Toggle theme">
                <span className={`toggle-knob ${theme === 'dark' ? 'on' : ''}`} />
              </button>
            </div>

            <div className="settings-row">
              <div className="settings-row-left">
                <Download size={18} />
                <div>
                  <span className="settings-label">Downloads</span>
                  <p className="settings-sub">View your saved resumes</p>
                </div>
              </div>
              <button className="btn-secondary settings-action-btn" onClick={() => navigate('/app/downloads')}>
                View ({downloadCount})
              </button>
            </div>
          </div>

          {/* Account Card */}
          <div className="profile-settings-card glass-card">
            <h4 className="settings-card-title">Account</h4>

            <div className="settings-row account-info-row">
              <div className="settings-row-left">
                <Mail size={18} />
                <div>
                  <span className="settings-label">Email Address</span>
                  <p className="settings-sub">{displayEmail}</p>
                </div>
              </div>
            </div>

            <div className="settings-row account-info-row">
              <div className="settings-row-left">
                <Shield size={18} />
                <div>
                  <span className="settings-label">Account Type</span>
                  <p className="settings-sub">Pro Member · Free Tier</p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="logout-section">
              <button className="logout-btn" onClick={handleLogout} disabled={signingOut}>
                {signingOut ? (
                  <><Loader2 size={18} className="spin" /> Signing out…</>
                ) : (
                  <><LogOut size={18} /> Sign Out</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
