import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css"; // Import CSS riêng

const RegisterForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  // Regex kiểm tra email & mật khẩu
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  // Kiểm tra lỗi khi blur input
  const validateField = (field, value) => {
    let newErrors = { ...errors };

    if (field === "name") {
      if (!value.trim()) newErrors.name = "Tên không được để trống";
      else delete newErrors.name;
    }

    if (field === "email") {
      if (!value.trim()) newErrors.email = "Email không được để trống";
      else if (!emailRegex.test(value)) newErrors.email = "Email không hợp lệ";
      else delete newErrors.email;
    }

    if (field === "password") {
      if (!value.trim()) newErrors.password = "Mật khẩu không được để trống";
      else if (!passwordRegex.test(value))
        newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự, 1 chữ hoa, 1 số, 1 ký tự đặc biệt";
      else delete newErrors.password;
    }

    if (field === "confirmPassword") {
      if (!value.trim()) newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      else if (value !== user.password) newErrors.confirmPassword = "Mật khẩu không khớp";
      else delete newErrors.confirmPassword;
    }

    setErrors(newErrors);
  };

  // Xử lý nhập input
  const handleInputChange = (field, value) => {
    setUser({ ...user, [field]: value });
    setTouched({ ...touched, [field]: true });

    // Kiểm tra lỗi ngay khi nhập đúng
    validateField(field, value);
  };

  // Xác thực toàn bộ form trước khi submit
  const validateForm = () => {
    let newErrors = {};

    Object.keys(user).forEach((field) => {
      validateField(field, user[field]);
      if (!user[field].trim()) newErrors[field] = "Không được để trống";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Đăng ký thành công!", user);
      navigate("/login"); // Điều hướng về trang đăng nhập
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h1>Đăng ký</h1>
        <p>Tạo tài khoản mới để trải nghiệm ngay!</p>
      </div>
      <form onSubmit={handleSubmit} className="register-form">
        {/* Tên */}
        <div className={`register-input-group ${errors.name ? "register-input-error" : ""}`}>
          <label>Tên:</label>
          <input
            type="text"
            className="register-input"
            value={user.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            onBlur={() => validateField("name", user.name)}
          />
          {touched.name && errors.name && <p className="register-error-message">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className={`register-input-group ${errors.email ? "register-input-error" : ""}`}>
          <label>Email:</label>
          <input
            type="email"
            className="register-input"
            value={user.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={() => validateField("email", user.email)}
          />
          {touched.email && errors.email && <p className="register-error-message">{errors.email}</p>}
        </div>

        {/* Mật khẩu */}
        <div className={`register-input-group ${errors.password ? "register-input-error" : ""}`}>
          <label>Mật khẩu:</label>
          <input
            type="password"
            className="register-input"
            value={user.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            onBlur={() => validateField("password", user.password)}
          />
          {touched.password && errors.password && <p className="register-error-message">{errors.password}</p>}
        </div>

        {/* Xác nhận mật khẩu */}
        <div className={`register-input-group ${errors.confirmPassword ? "register-input-error" : ""}`}>
          <label>Nhập lại mật khẩu:</label>
          <input
            type="password"
            className="register-input"
            value={user.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            onBlur={() => validateField("confirmPassword", user.confirmPassword)}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="register-error-message">{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit" className="register-button">Đăng ký</button>

        {/* Link quay lại trang đăng nhập */}
        <p className="register-links" onClick={() => navigate("/login")}>
          Đã có tài khoản? <span>Đăng nhập</span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
