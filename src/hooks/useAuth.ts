'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';
import { verifyToken } from '../lib/auth';
import { User } from '@/types/user';
import React from 'react';

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('auth-token');
    if (token) {
      const userData = verifyToken(token);
      setUser(userData);
    }
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    Cookies.set('auth-token', token, { expires: 1 }); // 1 day
    const userData = verifyToken(token);
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove('auth-token');
    setUser(null);
  };

  // return (
  //   <AuthContext.Provider value={{ user, login, logout, isLoading }}>
  //     {children}
  //   </AuthContext.Provider>
  // );
  return React.createElement(
    AuthContext.Provider,
    { value: { user, login, logout, isLoading } },
    children
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
