// src/components/Common/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;