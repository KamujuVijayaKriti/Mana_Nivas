'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import api from '@/lib/axios';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsUserLoading(false);
        return;
      }
      try {
        const { data } = await api.get('/auth/me');
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user session", error);
        localStorage.removeItem('token');
      } finally {
        setIsUserLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, pass) => {
    try {
      const { data } = await api.post('/auth/login', { email, password: pass });
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const signup = async (name, email, pass, role) => {
    try {
      const { data } = await api.post('/auth/register', { name, email, password: pass, role });
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('token');
    window.location.href = '/login'; // Force reload to clear states
  };

  const value = useMemo(() => ({
    user,
    data: user, // For compatibility
    login,
    signup,
    logout,
    isUserLoading,
  }), [user, isUserLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useUser() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useUser must be used within an AuthProvider');
  }
  return context;
}