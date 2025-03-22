import React from "react";
import { Carousel } from "react-bootstrap";
import sliderImg from "../../assets/images/slider/1.png";
import sliderImg1 from "../../assets/images/slider/2.png";
import "../Banner/banner.css"

const Banner = () => {
  return (
    <>
      <section className="slider">
        <Carousel variant="dark">
          <Carousel.Item>
            <img src={sliderImg} className="d-block w-100" alt="First slide" />
            <Carousel.Caption>
              <div className="slider_des">
                <h5 className="heading">
                  HÀNH TRÌNH <span>KHÁM PHÁ VIỆT NAM</span>
                </h5>
                <p className="sub_text">
                  Một mùa hè thật hấp dẫn với nhiều ưu đãi
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={sliderImg1} className="d-block w-100" alt="First slide" />
            <Carousel.Caption>
              <div className="slider_des">
                <h5 className="heading">
                  ĐỊA ĐIỂM ĐẸP <span>ĐANG CHỜ BẠN KHÁM PHÁ</span>
                </h5>
                <p className="sub_text">
                  Hãy cùng đặt tour ngay để có một kỳ nghỉ cùng gia đình của mình
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
    </>
  );
};

export default Banner;