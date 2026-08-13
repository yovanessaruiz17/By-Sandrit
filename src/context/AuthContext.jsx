import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoUser, setIsDemoUser] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      // Check for saved demo session in local state
      const savedDemo = localStorage.getItem('by_sandrit_demo_admin');
      if (savedDemo === 'true') {
        setUser({ email: 'admin@bysandrit.com', role: 'authenticated', id: 'demo-admin-id' });
        setIsDemoUser(true);
      }

      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session: existingSession } } = await supabase.auth.getSession();
          if (mounted && existingSession) {
            setSession(existingSession);
            setUser(existingSession.user);
            setIsDemoUser(false);
          }
        } catch (err) {
          console.error('Error fetching Supabase session:', err);
        }
      }
      if (mounted) setLoading(false);
    }

    getInitialSession();

    let authListener = null;
    if (isSupabaseConfigured && supabase) {
      const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user || null);
        setIsDemoUser(false);
        setLoading(false);
      });
      authListener = data.subscription;
    }

    return () => {
      mounted = false;
      if (authListener) authListener.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    // 1. If Supabase is configured, use real Supabase Auth
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        setUser(data.user);
        setSession(data.session);
        setIsDemoUser(false);
        localStorage.removeItem('by_sandrit_demo_admin');
        return { success: true, user: data.user };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }

    // 2. Demo fallback authentication if Supabase is not configured yet
    if (email && password) {
      const mockUser = {
        id: 'demo-admin-id',
        email: email,
        user_metadata: { name: 'Sandrit Ríos (Demo Admin)' },
        role: 'authenticated'
      };
      setUser(mockUser);
      setIsDemoUser(true);
      localStorage.setItem('by_sandrit_demo_admin', 'true');
      return { success: true, user: mockUser, isDemo: true };
    }

    return { success: false, error: 'Credenciales inválidas' };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
    setUser(null);
    setSession(null);
    setIsDemoUser(false);
    localStorage.removeItem('by_sandrit_demo_admin');
  };

  const value = {
    user,
    session,
    isAuthenticated: Boolean(user),
    isDemoUser,
    isSupabaseConfigured,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
