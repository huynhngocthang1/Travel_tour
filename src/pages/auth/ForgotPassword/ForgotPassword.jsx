import React, { useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import ForgotPasswordForm from "./ForgotPasswordForm";
import "./forgotPassword.css";

const ForgotPassword = () => {
  useEffect(() => {
    document.title = "Quên mật khẩu";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Breadcrumbs title="Quên mật khẩu" pagename="Quên mật khẩu" />
      
      <div className="forgot-password-container">
        <div className="forgot-password-header">
          <h1>Quên mật khẩu?</h1>
          <br/>
          <p>Nhập email của bạn để nhận liên kết đặt lại mật khẩu.</p>
        </div>
        <ForgotPasswordForm/>
      </div>
    </>
  );
};

export default ForgotPassword;
