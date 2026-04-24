/**
 * /auth/callback
 * Supabase redirects users here after they click the email verification link.
 * The URL hash contains the access_token — Supabase JS picks it up automatically
 * via detectSessionInUrl: true. We just wait for the session, then redirect.
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Supabase already exchanged the token from the URL hash.
    // We just need to check if a session now exists.
    const check = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        setStatus('error');
        setMessage(error.message);
        return;
      }

      if (session) {
        setStatus('success');
        setMessage('Email verified! Redirecting you to the app…');
        setTimeout(() => navigate('/app'), 1800);
      } else {
        // Retry once after a short delay (token exchange can be async)
        setTimeout(async () => {
          const { data: { session: s2 } } = await supabase.auth.getSession();
          if (s2) {
            setStatus('success');
            setMessage('Email verified! Redirecting you to the app…');
            setTimeout(() => navigate('/app'), 1500);
          } else {
            setStatus('error');
            setMessage('Verification failed or link has expired. Please try signing up again.');
          }
        }, 1500);
      }
    };

    check();
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1rem',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-body)',
      textAlign: 'center',
      padding: '2rem',
    }}>
      {status === 'loading' && (
        <>
          <Loader2 size={48} style={{ color: 'var(--accent-color)', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ color: 'var(--text-secondary)' }}>Verifying your email…</p>
        </>
      )}
      {status === 'success' && (
        <>
          <CheckCircle size={48} style={{ color: '#34d399' }} />
          <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{message}</p>
        </>
      )}
      {status === 'error' && (
        <>
          <AlertCircle size={48} style={{ color: '#f87171' }} />
          <p style={{ color: '#f87171', maxWidth: '360px' }}>{message}</p>
          <a href="/signup" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>
            Back to Sign Up
          </a>
        </>
      )}
    </div>
  );
};

export default AuthCallback;
