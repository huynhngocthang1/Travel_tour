import React, { useState, useEffect } from "react";
import "../Footer/footer.css";
import { Col, Container, Row, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(window.scrollY > 300);
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <>
      <footer className="footer">
        <Container>
          <Row className="py-5">
            {/* Cột 1 */}
            <Col md="3" sm="6">
              <h4>🌍 Về Chúng Tôi</h4>
              <p>Chúng tôi cung cấp những tour du lịch chất lượng với trải nghiệm đáng nhớ nhất.</p>
            </Col>

            {/* Cột 2 */}
            <Col md="3" sm="6">
              <h4>🔗 Liên Kết Nhanh</h4>
              <ListGroup variant="flush">
                <ListGroup.Item><NavLink to="/">Trang Chủ</NavLink></ListGroup.Item>
                <ListGroup.Item><NavLink to="/about-us">Giới Thiệu</NavLink></ListGroup.Item>
                <ListGroup.Item><NavLink to="/contact-us">Liên Hệ</NavLink></ListGroup.Item>
              </ListGroup>
            </Col>

            {/* Cột 3 */}
            <Col md="3" sm="6">
              <h4>🌍 Khám Phá</h4>
              <ListGroup variant="flush">
                <ListGroup.Item><NavLink to="/tours">Tour Du Lịch</NavLink></ListGroup.Item>
                <ListGroup.Item><NavLink to="/destinations">Điểm Đến</NavLink></ListGroup.Item>
                <ListGroup.Item><NavLink to="/faq">Câu Hỏi Thường Gặp</NavLink></ListGroup.Item>
              </ListGroup>
            </Col>

            {/* Cột 4 */}
            <Col md="3" sm="6">
              <h4>📍 Thông Tin Liên Hệ</h4>
              <p><i className="bi bi-geo-alt"></i> Phú Lộc, Thừa Thiên Huế</p>
              <p><i className="bi bi-envelope"></i> <a href="mailto:ngocthangthcs@gmail.com">ngocthangthcs@gmail.com</a></p>
              <p><i className="bi bi-telephone"></i> <a href="tel:0779407905">0779 407 905</a></p>
            </Col>
          </Row>

          <Row className="text-center copyright">
            <Col>
              <p>© 2025 Nhóm 66. All Rights Reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Nút quay lại đầu trang */}
      {visible && (
        <div className="back-to-top" onClick={scrollTop}>
          <i className="bi bi-arrow-up"></i>
        </div>
      )}
    </>
  );
};

export default Footer;
