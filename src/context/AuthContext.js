// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../services/authService";

// Thêm giá trị mặc định cho AuthContext
const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  loading: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      verifyToken(storedToken)
        .then((data) => {
          if (data.valid) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};