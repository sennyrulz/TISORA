import React, { useEffect, useState } from "react";  
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar.jsx"
import Dashboard from "../components/Dashboard.jsx"

function adminDashboardLanding() {
  return (
    <div>
      <Container style={{ marginTop: "150px", marginBottom: "100px", paddingTop: "20px" }}>
        <Row>
          <Col>
            <Sidebar />
            <Dashboard/>
          </Col>
        </Row>
    </Container>
    </div>
  );
}

export default adminDashboardLanding;
