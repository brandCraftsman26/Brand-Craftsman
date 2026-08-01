/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email?: string, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("bc_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem("bc_user");
      }
    }
  }, []);

  const login = (email: string = "client@brandcraftsman.com", name: string = "Craftsman User") => {
    const userData: User = {
      name,
      email,
      role: email.includes("admin") ? "admin" : "user",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + encodeURIComponent(name),
    };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("bc_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("bc_user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
