// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post("/forgot-password", { email });
  return response.data;
};

// Thêm hàm verifyToken
export const verifyToken = async (token) => {
  const response = await api.get("/verify-token", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};