import React, { useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import LoginForm from "./LoginForm";
import "./login.css";

const Login = () => {
  useEffect(() => {
    document.title = "Đăng nhập";
    window.scroll(0, 0);
  }, []);

  return (
    <>
      {/* Breadcrumbs giống trang Liên Hệ */}
      <Breadcrumbs title="Đăng nhập" pagename="Đăng nhập" />
      
      <div className="login-container">
        <div className="login-header">
          <h1>Chào mừng bạn đến với GoTravel</h1>
          <br/>
          <p>Đăng nhập để bắt đầu trải nghiệm ngay hôm nay!</p>
        </div>
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
