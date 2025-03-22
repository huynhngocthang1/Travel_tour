import React, { useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import RegisterForm from "./RegisterForm";
import "./register.css";

const Register = () => {
  useEffect(() => {
    document.title = "Đăng ký";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Breadcrumbs để điều hướng */}
      <Breadcrumbs title="Đăng ký" pagename="Đăng ký" />
      
      <div className="register-container">
        <div className="register-header">
          <h1>Chào mừng bạn đến với GoTravel</h1>
          <br/>
          <p>Tạo tài khoản để bắt đầu hành trình của bạn ngay hôm nay!</p>
        </div>
        <RegisterForm />
      </div>
    </>
  );
};

export default Register;
