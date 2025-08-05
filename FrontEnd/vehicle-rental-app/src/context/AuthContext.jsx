import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Utility to check JWT expiry
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000; // exp is in seconds
      return Date.now() > expiryTime;
    } catch (err) {
      console.error('Invalid token:', err);
      return true; // treat malformed as expired
    }
  };

  // ✅ Login: Save to localStorage + Axios header
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] =
      `${userData.tokenType || 'Bearer'} ${userData.token}`;
  };

  // ✅ Logout: Clear everything
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  // ✅ On App load: check token validity
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (!parsed.token || isTokenExpired(parsed.token)) {
          logout(); // 🔁 Expired or invalid? Auto logout
        } else {
          setUser(parsed);
          axios.defaults.headers.common['Authorization'] =
            `${parsed.tokenType || 'Bearer'} ${parsed.token}`;
        }
      } catch (err) {
        logout(); // 💥 Malformed localStorage data
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
