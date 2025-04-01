// src/auth/Login/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./login.css";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{6,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (!isValidPassword(password)) {
      newErrors.password =
        "Mật khẩu phải có ít nhất 6 ký tự, 1 chữ hoa, 1 số và 1 ký tự đặc biệt";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      onLoginSuccess(response.data.token, response.data.user);
      toast.success("Đăng nhập thành công!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setTouched({ ...touched, [field]: true });
    setErrors({ ...errors, [field]: "" });
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className={`input-group ${errors.email ? "input-error" : ""}`}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          onBlur={() => setTouched({ ...touched, email: true })}
          placeholder="Nhập email của bạn"
          disabled={loading}
        />
        <div className="error-container">
          {touched.email && errors.email && (
            <p className="error-message">{errors.email}</p>
          )}
        </div>
      </div>

      <div className={`input-group ${errors.password ? "input-error" : ""}`}>
        <label>Mật khẩu:</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            onBlur={() => setTouched({ ...touched, password: true })}
            placeholder="Nhập mật khẩu"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="toggle-password"
            disabled={loading}
          >
            {showPassword ? "Ẩn" : "Hiện"}
          </button>
        </div>
        <div className="error-container">
          {touched.password && errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
      </div>

      <button type="submit" className="login-button" disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>

      <div className="login-links">
        <p onClick={() => navigate("/forgot-password")}>Quên mật khẩu?</p>
        <p onClick={() => navigate("/register")}>
          Chưa có tài khoản? <span>Đăng ký</span>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;