import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../AdvanceSearch/search.css";
import { Container, Row, Col, Button } from "react-bootstrap";
// import
import CustomDropdown from "../CustomDropdown/CustomDropdown";

const AdvanceSearch = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectedLocation =(value)=>{
    console.log("Vị trí", value)
  }

  const selectedGuest =(value)=>{
    console.log("Khách ", value)
  }

  return (
    <>
      <section className="box-search-advance">
        <Container>
          <Row>
            <Col md={12} xs={12}>
              <div className="box-search shadow-sm">
                <div className="item-search">
                  {/*  Using Props to Pass Data */}
                  <CustomDropdown
                    label="Vị trí"
                    onSelect={selectedLocation}
                    options={[
                      "Cố Đô Huế, TP. Huế",
                      "Tràng An, Ninh Bình",
                      "SaPa, Lào Cai",
                      "Động Phong Nha, Quảng Bình",
                      "Phố Cổ Hội An, Quảng Nam",
                    ]}
                  />
                </div>
                <div className="item-search item-search-2">
                  <label className="item-search-label"> Ngày đi </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                   
                    dateFormat="dd, MMMM, yyyy"
                  />
                </div>
                <div className="item-search item-search-2">
                  <label className="item-search-label"> Ngày về </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={endDate}
                    endDate={startDate}
                    dateFormat="dd, MMMM, yyyy"
                  />
                </div>
                <div className="item-search bd-none">
                  <CustomDropdown
                    label="Khách"
                    onSelect={selectedGuest}
                    options={[
                      "2 người lớn, 1 trẻ em",
                      "2 người lớn, 1 trẻ em",                      
                      "2 người lớn, 3 trẻ em",
                    ]}
                  />
                </div>
                <div className="item-search bd-none">
                    <Button className="primaryBtn flex-even d-flex justify-content-center">
                    <i className="bi bi-search me-2"></i> Tìm kiếm 
                    </Button>

                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdvanceSearch;