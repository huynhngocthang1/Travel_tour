// src/components/Common/Header/Header.jsx
import React, { useEffect, useState } from "react";
import { Container, Navbar, Offcanvas, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../Header/header.css";

const Header = ({ cartCount }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => setOpen(!open);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => window.removeEventListener("scroll", isSticky);
  }, []);

  const isSticky = () => {
    const header = document.querySelector(".header-section");
    header.classList.toggle("is-sticky", window.scrollY >= 120);
  };

  return (
    <header className="header-section">
      <Container>
        <Navbar expand="lg" className="p-0">
          <Navbar.Brand>
            <NavLink to="/">GoTravel</NavLink>
          </Navbar.Brand>

          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="start"
            show={open}
          >
            <Offcanvas.Header>
              <h1 className="logo">GoTravel</h1>
              <span className="navbar-toggler ms-auto" onClick={toggleMenu}>
                <i className="bi bi-x-lg"></i>
              </span>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink className="nav-link" to="/">Trang chủ</NavLink>
                <NavLink className="nav-link" to="/about-us">Về chúng tôi</NavLink>
                <NavLink className="nav-link" to="/tours">TOURS</NavLink>
                <NavDropdown title="Điểm đến" id="offcanvasNavbarDropdown-expand-lg">
                  <NavLink className="nav-link text-dark" to="/destinations">Tất cả điểm đến</NavLink>
                  <NavLink className="nav-link text-dark" to="/destinations/hue">Huế</NavLink>
                </NavDropdown>
                <NavLink className="nav-link" to="/gallery">Thư Viện</NavLink>
                <NavLink className="nav-link" to="/contact-us">Liên Hệ</NavLink>
                {user && <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          <div className="ms-md-4 ms-2 d-flex align-items-center">
            {/* Giỏ hàng */}
            <NavLink className="cart-icon me-3 position-relative" to="/cart">
              <i className="bi bi-cart fs-5"></i>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>

            {/* Hiển thị thông tin User */}
            {user ? (
              <div className="user-section">
                <div className="user-icon" onClick={toggleDropdown}>
                  <i className="bi bi-person-circle fs-5"></i>
                  <span className="user-name">{user.fullName}</span>
                </div>
                {showDropdown && (
                  <div className="user-dropdown">
                    <p>{user.email}</p>
                    <button onClick={handleLogout}>Đăng xuất</button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink className="login-icon me-3" to="/login">
                <i className="bi bi-person-circle fs-5"></i>
                <span className="login-text">Đăng nhập</span>
              </NavLink>
            )}

            <NavLink className="primaryBtn d-none d-sm-inline-block" to="/booking">Đặt vé ngay</NavLink>
            <li className="d-inline-block d-lg-none ms-3 toggle_btn">
              <i className={open ? "bi bi-x-lg" : "bi bi-list"} onClick={toggleMenu}></i>
            </li>
          </div>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
