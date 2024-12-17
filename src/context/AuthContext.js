// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const AuthContext = createContext();

// AuthProvider Component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  useEffect(() => {
    // Check for token in localStorage or cookies
    const token = localStorage.getItem("token") || document.cookie.split(';').find(item => item.trim().startsWith('token='));
    
    if (token) {
      setAuthState({ ...authState, isAuthenticated: true, token });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const { data } = await axios.post("/api/login", { username, password });
      const { token, user } = data;

      // Store the token in localStorage and update the state
      localStorage.setItem("token", token);
      setAuthState({ ...authState, isAuthenticated: true, user, token });

      // Optionally, store the token in cookies (HTTP-only for production)
      document.cookie = `token=${token}; path=/;`;
      
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    // Clear token from localStorage and cookies
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    
    setAuthState({ isAuthenticated: false, user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
