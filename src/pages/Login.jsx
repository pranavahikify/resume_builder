import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { signIn } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate                = useNavigate();
  const { isAuthenticated }     = useAuth();

  // If already logged-in (e.g. revisiting /login after session restore), go to app
  useEffect(() => {
    if (isAuthenticated) navigate('/app', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: authError } = await signIn({ email, password });

      setLoading(false);

      if (authError) {
        if (authError.message.includes('Email not confirmed')) {
          setError('Please verify your email first. Check your inbox for the confirmation link.');
        } else if (
          authError.message.includes('Invalid login credentials') ||
          authError.message.includes('invalid_credentials')
        ) {
          setError('Incorrect email or password. Please try again.');
        } else {
          setError(authError.message);
        }
        return;
      }

      // ✅ Navigate immediately on success
      navigate('/app', { replace: true });
    } catch (err) {
      setLoading(false);
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container glass-card animate-fade-in">
        <div className="auth-header text-center">
          <Link to="/" className="logo justify-center mb-6">
            <Sparkles className="logo-icon" />
            <span>ResumeAI</span>
          </Link>
          <h2 className="section-title mb-2">Welcome Back</h2>
          <p className="text-secondary">Sign in to continue building your resume</p>
        </div>

        {error && (
          <div className="auth-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <label className="input-label" htmlFor="login-email">Email</label>
            <div className="input-wrapper">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                id="login-email"
                className="input-field input-with-icon"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="login-password">Password</label>
            <div className="input-wrapper">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                id="login-password"
                className="input-field input-with-icon"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full mt-4" disabled={loading}>
            {loading ? (
              <><Loader2 size={18} className="spin" /> Signing in…</>
            ) : (
              <>Sign In <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <div className="auth-footer text-center mt-6">
          <p className="text-secondary">
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
