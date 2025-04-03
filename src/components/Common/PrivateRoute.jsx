// src/components/Common/PrivateRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const PrivateRoute = ({ children, roles = [] }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Kiểm tra đăng nhập
  if (!user) {
    toast.error("Vui lòng đăng nhập để truy cập!");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Kiểm tra vai trò (nếu có)
  if (roles.length > 0 && !roles.includes(user.role)) {
    toast.error("Bạn không có quyền truy cập trang này!");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;