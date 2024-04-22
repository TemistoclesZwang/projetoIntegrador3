// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  accessToken: string;
  role: string;
  isLoggedIn: boolean;
  login: (accessToken: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export const AuthProvider = ({ children }:{children:React.ReactNode}) => {
  const [authState, setAuthState] = useState({
    accessToken: localStorage.getItem('accessToken') || '',
    role: localStorage.getItem('role') || '',
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
  });

  const login = (accessToken:string, role:string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('role', role);
    localStorage.setItem('isLoggedIn', 'true');
    setAuthState({
      accessToken,
      role,
      isLoggedIn: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    localStorage.removeItem('isLoggedIn');
    setAuthState({
      accessToken: '',
      role: '',
      isLoggedIn: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

