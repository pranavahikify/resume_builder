import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layout, Download } from 'lucide-react';
import resumePreview from '../assets/profile-photo.png';
import './Landing.css';

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="landing-page">
      <nav className="landing-nav container">
        <div className="logo">
          <Sparkles className="logo-icon" />
          <span>ResumeAI</span>
        </div>
        <div className="nav-links">
          <Link to="/login" className="btn-secondary">Login</Link>
          <Link to="/signup" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      <main className="hero-section container">
        <div className="hero-content animate-fade-in">
          <h1 className="hero-title">
            Build a <span className="text-gradient">Professional Resume</span> in Minutes
          </h1>
          <p className="hero-subtitle">
            Stand out from the crowd with our premium templates, real-time builder, and smart suggestions. Land your dream job today.
          </p>
          <div className="hero-cta">
            <Link to="/signup" className="btn-primary btn-large scene-3d">
              <div className="btn-3d-content">
                Get Started Free <ArrowRight size={20} />
              </div>
            </Link>
          </div>
        </div>

        <div className="hero-visual scene-3d animate-float">
          <div 
            className="resume-3d-mockup object-3d"
            style={{
              transform: `rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
            }}
          >
            {/* Realistic resume preview image */}
            <img 
              src={resumePreview} 
              alt="Resume Template Preview" 
              className="mockup-resume-img"
            />
            {/* Floating badge */}
            <div className="mockup-badge">
              <Sparkles size={12} />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
      </main>

      <section className="features-section container section-padding">
        <h2 className="section-title text-center">Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card glass-card">
            <div className="feature-icon"><Layout size={32} /></div>
            <h3>100+ Premium Templates</h3>
            <p>Choose from a wide variety of professionally designed, ATS-friendly templates.</p>
          </div>
          <div className="feature-card glass-card">
            <div className="feature-icon"><Sparkles size={32} /></div>
            <h3>Real-time Builder</h3>
            <p>See your resume update instantly as you type with our dynamic two-sided editor.</p>
          </div>
          <div className="feature-card glass-card">
            <div className="feature-icon"><Download size={32} /></div>
            <h3>Easy Export</h3>
            <p>Download your resume in high-quality PDF format with a single click.</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container footer-content">
          <div className="footer-logo">
            <Sparkles className="logo-icon" size={20} /> ResumeAI
          </div>
          <p className="footer-text">&copy; 2026 ResumeAI Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
