import React, { createContext, useState, useEffect, useCallback } from 'react';
import authApi from '../services/auth.api';

export const AuthContext = createContext();

const TOKEN_KEY = 'smartai-auth-token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(() => {
    try {
      return localStorage.getItem(TOKEN_KEY) || null;
    } catch (e) {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const persistToken = (nextToken) => {
    try {
      if (nextToken) {
        localStorage.setItem(TOKEN_KEY, nextToken);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch (e) {
    }
    setTokenState(nextToken);
  };

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const me = await authApi.me();
        if (!cancelled) setUser(me);
      } catch (e) {
        if (!cancelled) persistToken(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    restoreSession();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async ({ email, password, remember }) => {
    setError(null);
    try {
      const result = await authApi.login({ email, password });
      persistToken(result.token);
      setUser(result.user);
      try {
        localStorage.setItem('smartai-remember-email', remember ? email : '');
      } catch (e) {}
      return result.user;
    } catch (e) {
      const message = e?.error || e?.message || 'Failed to sign in';
      setError(message);
      throw new Error(message);
    }
  }, []);

  const register = useCallback(async ({ name, email, password }) => {
    setError(null);
    try {
      const result = await authApi.register({ name, email, password });
      persistToken(result.token);
      setUser(result.user);
      return result.user;
    } catch (e) {
      const message = e?.error || e?.message || 'Failed to create account';
      setError(message);
      throw new Error(message);
    }
  }, []);

  const logout = useCallback(() => {
    persistToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}