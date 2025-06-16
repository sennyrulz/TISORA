// Dashboard.jsx
import React, { useEffect, useState } from "react";  // useEffect from react
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
import DashboardLanding from '../components/DashboardLanding.jsx'
import Orders from '../components/Orders.jsx'
import Sidebar from "../components/Sidebar.jsx"

function Dashboard() {
  return (
    <Container style={{ marginTop: "150px", marginBottom: "100px", paddingTop: "20px" }}>
      <Row>
        <Col>
          <Sidebar />
          <DashboardLanding />
          <Orders />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;

