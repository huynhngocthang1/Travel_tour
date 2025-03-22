import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Hàm kiểm tra định dạng email
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setSuccess("");

    // Kiểm tra nhập email
    if (!email) {
      setErrors("Email không được để trống");
      setTimeout(() => setErrors(""), 3000);
      return;
    } else if (!validateEmail(email)) {
      setErrors("Email không hợp lệ");
      setTimeout(() => setErrors(""), 3000);
      return;
    }

    setLoading(true);

    // Giả lập gọi API gửi email (2 giây)
    setTimeout(() => {
      setLoading(false);
      setSuccess("Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.");

      // Chuyển hướng về trang đăng nhập sau 3 giây
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="forgot-password-form">
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email của bạn"
          disabled={loading}
        />
        {errors && <p className="error-message">{errors}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Đang gửi..." : "Gửi liên kết"}
      </button>
      
      {/* Link quay lại đăng nhập */}
      <p className="back-to-login" onClick={() => navigate("/login")}>
        Quay lại trang đăng nhập
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
