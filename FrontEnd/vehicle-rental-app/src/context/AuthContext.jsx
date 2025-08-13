import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000; 
      return Date.now() > expiryTime;
    } catch (err) {
      console.error('Invalid token:', err);
      return true; 
    }
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] =
      `${userData.tokenType || 'Bearer'} ${userData.token}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (!parsed.token || isTokenExpired(parsed.token)) {
          logout(); 
        } else {
          setUser(parsed);
          axios.defaults.headers.common['Authorization'] =
            `${parsed.tokenType || 'Bearer'} ${parsed.token}`;
        }
      } catch (err) {
        logout(); 
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoggedIn: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
