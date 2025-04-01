// src/auth/Register/RegisterForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./register.css";

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Hàm kiểm tra định dạng email hợp lệ
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Hàm kiểm tra mật khẩu hợp lệ
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{6,}$/;
    return passwordRegex.test(password);
  };

  // Xác thực form
  const validateForm = () => {
    let newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Họ tên không được để trống";
    }

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

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý khi bấm nút đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        fullName,
        email,
        password,
      });

      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login"); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi nhập vào input
  const handleInputChange = (field, value) => {
    setTouched({ ...touched, [field]: true });
    setErrors({ ...errors, [field]: "" });
    if (field === "fullName") setFullName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      {/* Họ tên */}
      <div className={`input-group ${errors.fullName ? "input-error" : ""}`}>
        <label>Họ tên:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
          onBlur={() => setTouched({ ...touched, fullName: true })}
          placeholder="Nhập họ tên của bạn"
          disabled={loading}
        />
        <div className="error-container">
          {touched.fullName && errors.fullName && (
            <p className="error-message">{errors.fullName}</p>
          )}
        </div>
      </div>

      {/* Email */}
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

      {/* Mật khẩu */}
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

      {/* Xác nhận mật khẩu */}
      <div
        className={`input-group ${errors.confirmPassword ? "input-error" : ""}`}
      >
        <label>Xác nhận mật khẩu:</label>
        <div className="password-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            onBlur={() => setTouched({ ...touched, confirmPassword: true })}
            placeholder="Xác nhận mật khẩu"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="toggle-password"
            disabled={loading}
          >
            {showConfirmPassword ? "Ẩn" : "Hiện"}
          </button>
        </div>
        <div className="error-container">
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <button type="submit" className="register-button" disabled={loading}>
        {loading ? "Đang đăng ký..." : "Đăng ký"}
      </button>

      <div className="register-links">
        <p onClick={() => navigate("/login")}>
          Đã có tài khoản? <span>Đăng nhập</span>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;