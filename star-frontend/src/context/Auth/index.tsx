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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState({
    accessToken: sessionStorage.getItem('accessToken') || '',
    role: localStorage.getItem('role') || '',
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
  });

  const login = (accessToken: string, role: string) => {
    sessionStorage.setItem('accessToken', accessToken); // Salvar accessToken no sessionStorage
    localStorage.setItem('role', role);               // Manter role no localStorage
    localStorage.setItem('isLoggedIn', 'true');       // Manter isLoggedIn no localStorage
    setAuthState({
      accessToken,
      role,
      isLoggedIn: true,
    });
  };

  const logout = () => {
    sessionStorage.removeItem('accessToken');         // Remover accessToken do sessionStorage
    localStorage.removeItem('role');                  // Remover role do localStorage
    localStorage.removeItem('isLoggedIn');            // Remover isLoggedIn do localStorage
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
