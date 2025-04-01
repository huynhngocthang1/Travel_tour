// src/pages/auth/ForgotPassword/ForgotPasswordForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./forgotPassword.css";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Hàm kiểm tra định dạng email hợp lệ
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Xác thực form
  const validateForm = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý khi bấm nút gửi yêu cầu
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/forgot-password", { email });
      toast.success("Yêu cầu đã được gửi! Vui lòng kiểm tra email của bạn.");
      setTimeout(() => navigate("/login"), 2000); // Chuyển hướng sau 2 giây
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi nhập vào input
  const handleInputChange = (field, value) => {
    setTouched({ ...touched, [field]: true });
    setErrors({ ...errors, [field]: "" });
    if (field === "email") setEmail(value);
  };

  return (
    <form onSubmit={handleSubmit} className="forgot-password-form">
      {/* Ô nhập Email */}
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

      <button
        type="submit"
        className="forgot-password-button"
        disabled={loading}
      >
        {loading ? "Đang gửi..." : "Gửi yêu cầu"}
      </button>

      <div className="forgot-password-links">
        <p onClick={() => navigate("/login")}>
          Quay lại <span>Đăng nhập</span>
        </p>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;