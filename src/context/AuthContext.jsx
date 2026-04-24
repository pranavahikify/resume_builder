import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, getProfile } from '../lib/supabase';

const AuthContext = createContext(null);

/**
 * Wrap your app in <AuthProvider> to make auth state available everywhere.
 * Access it with the useAuth() hook.
 */
export const AuthProvider = ({ children }) => {
  const [session, setSession]   = useState(null);   // Supabase session object
  const [user, setUser]         = useState(null);   // auth.users row
  const [profile, setProfile]   = useState(null);   // public.profiles row
  const [loading, setLoading]   = useState(true);   // initial auth check

  // ── Load profile whenever the user changes ─────────────────────────────────
  const loadProfile = async (authUser) => {
    if (!authUser) { setProfile(null); return; }
    const { data } = await getProfile(authUser.id);
    setProfile(data ?? null);
  };

  // ── Subscribe to auth state changes ───────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    let initialLoadDone = false;

    // Safety net: always resolve loading within 6 seconds
    const safetyTimer = setTimeout(() => {
      if (mounted && !initialLoadDone) {
        console.warn('AuthContext: safety timeout — forcing loading=false');
        setLoading(false);
        initialLoadDone = true;
      }
    }, 6000);

    // 1. Restore the existing session on mount
    supabase.auth.getSession()
      .then(({ data: { session: s } }) => {
        if (!mounted) return;
        setSession(s);
        setUser(s?.user ?? null);
        
        // Load profile asynchronously so it doesn't block the UI
        loadProfile(s?.user ?? null).catch(err => console.error(err));
        
        if (mounted && !initialLoadDone) {
          setLoading(false);
          initialLoadDone = true;
        }
      })
      .catch((err) => {
        console.error('Error getting session:', err);
        if (mounted && !initialLoadDone) {
          setLoading(false);
          initialLoadDone = true;
        }
      });

    // 2. Listen for sign-in / sign-out / token refresh
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, s) => {
        if (!mounted) return;
        setSession(s);
        setUser(s?.user ?? null);
        // Load profile in the background — don't block loading state here
        loadProfile(s?.user ?? null).catch((err) => {
          console.error('Error loading profile on auth change:', err);
        });
        // Ensure loading is cleared if it somehow wasn't
        if (mounted) setLoading(false);
      }
    );

    return () => {
      mounted = false;
      clearTimeout(safetyTimer);
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    profile,
    loading,
    isAuthenticated: !!session,
    /** Call after updating profile to refresh the cached data. */
    refreshProfile: () => loadProfile(user),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/** Hook — use anywhere inside the app to get auth state. */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};

export default AuthContext;
