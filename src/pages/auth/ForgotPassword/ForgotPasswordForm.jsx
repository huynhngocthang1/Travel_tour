import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgotPassword.css"; // Import CSS riêng

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Nhập email, Step 2: Nhập OTP
  const navigate = useNavigate();

  // Hàm kiểm tra định dạng email
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Hàm kiểm tra OTP (giả lập)
  const validateOtp = (otp) => {
    return /^\d{6}$/.test(otp); // OTP gồm 6 số
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setSuccess("");

    // Kiểm tra email nhập vào
    if (!email) {
      setErrors("Email không được để trống");
      return;
    } else if (!validateEmail(email)) {
      setErrors("Email không hợp lệ");
      return;
    }

    setLoading(true);

    // Giả lập gửi email (2 giây)
    setTimeout(() => {
      setLoading(false);
      setSuccess("Mã OTP đã được gửi đến email của bạn.");
      setStep(2); // Chuyển sang bước nhập OTP
    }, 2000);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setErrors("");
    setSuccess("");

    // Kiểm tra mã OTP
    if (!otp) {
      setErrors("Vui lòng nhập mã OTP");
      return;
    } else if (!validateOtp(otp)) {
      setErrors("Mã OTP không hợp lệ (gồm 6 số)");
      return;
    }

    setLoading(true);

    // Giả lập xác thực OTP (2 giây)
    setTimeout(() => {
      setLoading(false);
      setSuccess("Xác thực thành công! Vui lòng đặt lại mật khẩu mới.");

      // Chuyển hướng đến trang đặt lại mật khẩu
      setTimeout(() => {
        navigate("/reset-password");
      }, 3000);
    }, 2000);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Quên mật khẩu</h2>
        <p>Nhập email của bạn để nhận mã OTP</p>

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit}>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                disabled={loading}
              />
            </div>

            {errors && <p className="forgot-error-message">{errors}</p>}
            {success && <p className="success-message">{success}</p>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Đang gửi..." : "Gửi mã OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <div className="input-group">
              <label>Mã OTP:</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Nhập mã OTP (6 số)"
                disabled={loading}
              />
            </div>

            {errors && <p className="error-message">{errors}</p>}
            {success && <p className="success-message">{success}</p>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Đang xác thực..." : "Xác nhận OTP"}
            </button>
          </form>
        )}

        {/* Link quay lại đăng nhập */}
        <p className="back-to-login" onClick={() => navigate("/login")}>
          Quay lại trang đăng nhập
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
