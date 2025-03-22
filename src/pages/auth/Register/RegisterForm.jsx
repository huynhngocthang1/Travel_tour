import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const validateForm = () => {
    let newErrors = {};

    if (!user.name.trim()) newErrors.name = "Tên không được để trống";
    if (!user.email) newErrors.email = "Email không được để trống";
    else if (!emailRegex.test(user.email)) newErrors.email = "Email không hợp lệ";

    if (!user.password) newErrors.password = "Mật khẩu không được để trống";
    else if (!passwordRegex.test(user.password))
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự, 1 chữ hoa, 1 số, 1 ký tự đặc biệt";

    if (!user.confirmPassword) newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    else if (user.password !== user.confirmPassword)
      newErrors.confirmPassword = "Mật khẩu không khớp";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Đăng ký thành công!", user);
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className={`input-group ${errors.name ? "input-error" : ""}`}>
        <label>Tên:</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          onBlur={() => setTouched({ ...touched, name: true })}
        />
        {errors.name && touched.name && <p className="error-message">{errors.name}</p>}
      </div>

      <div className={`input-group ${errors.email ? "input-error" : ""}`}>
        <label>Email:</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          onBlur={() => setTouched({ ...touched, email: true })}
        />
        {errors.email && touched.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div className={`input-group ${errors.password ? "input-error" : ""}`}>
        <label>Mật khẩu:</label>
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          onBlur={() => setTouched({ ...touched, password: true })}
        />
        {errors.password && touched.password && <p className="error-message">{errors.password}</p>}
      </div>

      <div className={`input-group ${errors.confirmPassword ? "input-error" : ""}`}>
        <label>Nhập lại mật khẩu:</label>
        <input
          type="password"
          value={user.confirmPassword}
          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
          onBlur={() => setTouched({ ...touched, confirmPassword: true })}
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <p className="error-message">{errors.confirmPassword}</p>
        )}
      </div>

      <button type="submit" className="register-button">Đăng ký</button>
      <p className="register-links" onClick={() => navigate("/login")}>
        Đã có tài khoản? <span>Đăng nhập</span>
      </p>
    </form>
  );
};

export default RegisterForm;
