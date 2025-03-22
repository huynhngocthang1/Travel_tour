import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Navbar,
  Offcanvas,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../Header/header.css";

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(()=>{
    window.addEventListener("scroll", isSticky);
    return ()=>{
      window.removeEventListener("scroll", isSticky)
    }
  })

  // sticky Header 
  const isSticky=(e)=>{
    const header = document.querySelector('.header-section');
    const scrollTop = window.scrollY;
    scrollTop >= 120 ? header.classList.add('is-sticky') :
    header.classList.remove('is-sticky')
  }


 

  return (
    
    <header className="header-section">
      <Container>
       
          <Navbar expand="lg" className="p-0">
            {/* Logo Section  */}
            <Navbar.Brand>
              <NavLink to="/"> GoTravel</NavLink>
            </Navbar.Brand>
            {/* End Logo Section  */}

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="start"
              show={open}
            >
              {/*mobile Logo Section  */}
              <Offcanvas.Header>
                <h1 className="logo">GoTravel</h1>
                <span className="navbar-toggler ms-auto"  onClick={toggleMenu}>
                  <i className="bi bi-x-lg"></i>
                </span>
              </Offcanvas.Header>
              {/*end mobile Logo Section  */}

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavLink className="nav-link" to="/" >
                    Trang chủ
                  </NavLink>
                  <NavLink className="nav-link" to="/about-us" >
                    Về chúng tôi
                  </NavLink>
                  <NavLink className="nav-link" to="/tours" >
                    TOURS
                  </NavLink>

                  <NavDropdown
                    title="DESTINATION"
                    id={`offcanvasNavbarDropdown-expand-lg`}
                  >
                   
                      
                    <NavLink className="nav-link text-dark" to="/" >
                    SPAIN TOURS
                  </NavLink>
                  
                   
                  </NavDropdown>
                  <NavLink className="nav-link" to="/" >
                    Thư Viện
                  </NavLink>
                  <NavLink className="nav-link" to="/contact-us" >
                    Liên Hệ
                  </NavLink>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <div className="ms-md-4 ms-2 d-flex align-items-center">
               {/* Giỏ hàng */}
  <NavLink className="cart-icon me-3 position-relative" to="/cart">
    <i className="bi bi-cart fs-5"></i>
    <span className="cart-badge">3</span> {/* Số lượng sản phẩm trong giỏ */}
  </NavLink>

  {/* Đăng nhập */}
  <NavLink className="login-icon me-3" to="/login">
    <i className="bi bi-person-circle fs-5"></i>
    <span className="login-text">Đăng nhập</span>
  </NavLink>
              <NavLink className="primaryBtn d-none d-sm-inline-block">
                Đặt vé ngay
              </NavLink>
              <li className="d-inline-block d-lg-none ms-3 toggle_btn">
                <i className={open ? "bi bi-x-lg" : "bi bi-list"}  onClick={toggleMenu}></i>
              </li>
            </div>
          </Navbar>
    
      </Container>
    </header>
  );
};

export default Header;