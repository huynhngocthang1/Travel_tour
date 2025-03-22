import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
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

    if (!email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (!isValidPassword(password)) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự, 1 chữ hoa, 1 số và 1 ký tự đặc biệt";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý khi bấm nút đăng nhập
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Đăng nhập thành công!", { email, password });
      navigate("/");
    }
  };

  // Xử lý khi nhập vào input
  const handleInputChange = (field, value) => {
    setTouched({ ...touched, [field]: true });
    setErrors({ ...errors, [field]: "" }); // Ẩn lỗi khi người dùng bắt đầu nhập
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {/* Ô nhập Email */}
      <div className={`input-group ${errors.email ? "input-error" : ""}`}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          onBlur={() => setTouched({ ...touched, email: true })}
          placeholder="Nhập email của bạn"
        />
        <div className="error-container">
          {touched.email && errors.email && <p className="error-message">{errors.email}</p>}
        </div>
      </div>

      {/* Ô nhập Mật khẩu */}
      <div className={`input-group ${errors.password ? "input-error" : ""}`}>
        <label>Mật khẩu:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          onBlur={() => setTouched({ ...touched, password: true })}
          placeholder="Nhập mật khẩu"
        />
        <div className="error-container">
          {touched.password && errors.password && <p className="error-message">{errors.password}</p>}
        </div>
      </div>

      <button type="submit" className="login-button">Đăng nhập</button>

      <div className="login-links">
        <p onClick={() => navigate("/forgot-password")}>Quên mật khẩu?</p>
        <p onClick={() => navigate("/register")}>Chưa có tài khoản? <span>Đăng ký</span></p>
      </div>
    </form>
  );
};

export default LoginForm;
