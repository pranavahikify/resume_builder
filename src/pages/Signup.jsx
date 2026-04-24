import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, User, Mail, Lock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { signUp } from '../lib/supabase';
import './Auth.css';

const Signup = () => {
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const { error: authError } = await signUp({ email, password, fullName: name });
      setLoading(false);

      if (authError) {
        if (authError.message.includes('already registered')) {
          setError('This email is already registered. Try signing in instead.');
        } else {
          setError(authError.message);
        }
        return;
      }

      // Show the "check your email" success state
      setSuccess(true);
    } catch (err) {
      setLoading(false);
      setError('An unexpected error occurred. Please try again.');
      console.error('Signup error:', err);
    }
  };

  // ── Email sent confirmation screen ─────────────────────────────────────────
  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-container glass-card animate-fade-in text-center">
          <div className="auth-success-icon">
            <Mail size={40} />
          </div>
          <h2 className="section-title mb-2">Check your inbox!</h2>
          <p className="text-secondary mb-6">
            We sent a confirmation link to <strong>{email}</strong>.
            Click it to activate your account, then sign in.
          </p>
          <Link to="/login" className="btn-primary">
            Go to Sign In <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  // ── Signup form ─────────────────────────────────────────────────────────────
  return (
    <div className="auth-page">
      <div className="auth-container glass-card animate-fade-in">
        <div className="auth-header text-center">
          <Link to="/" className="logo justify-center mb-6">
            <Sparkles className="logo-icon" />
            <span>ResumeAI</span>
          </Link>
          <h2 className="section-title mb-2">Create an Account</h2>
          <p className="text-secondary">Start building your professional resume</p>
        </div>

        {error && (
          <div className="auth-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="auth-form">
          <div className="input-group">
            <label className="input-label" htmlFor="signup-name">Full Name</label>
            <div className="input-wrapper">
              <User size={16} className="input-icon" />
              <input
                type="text"
                id="signup-name"
                className="input-field input-with-icon"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="signup-email">Email</label>
            <div className="input-wrapper">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                id="signup-email"
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
            <label className="input-label" htmlFor="signup-password">
              Password
              <span className="input-hint"> (min. 6 characters)</span>
            </label>
            <div className="input-wrapper">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                id="signup-password"
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
              <><Loader2 size={18} className="spin" /> Creating account…</>
            ) : (
              <>Create Account <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <div className="auth-footer text-center mt-6">
          <p className="text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-accent">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
