// Dashboard.jsx
import React, { useEffect, useState } from "react";  // useEffect from react
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUp, login, logout } from "../redux/userAuthSlice";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import Sidebar from "../components/Sidebar"

function Dashboard() {
  const navigate = useNavigate();
  const user = userState?.user;
  const userState = useSelector((state) => state.user);
  const isAuthenticated = userState?.isAuthenticated;
  const dispatch = useDispatch();

    // Redirect to login if no longer authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container style={{ marginTop: "150px", marginBottom: "100px", paddingTop: "20px" }}>
      <Sidebar />
      <Row className="justify-content-center">
        <Col md={{ span: 6, offset: 2 }} className="text-start">
          <h1 className="mb-3 pt-md-5 pb-md-3 fw-normal" style={{ fontSize: "3rem" }}>
            User Dashboard
          </h1>
          {isAuthenticated && user ? (
            <>

              <p>ID: {user.id || user._id}</p>
              <p>Welcome, {user.fullName || user.name}!</p>
              <p>Email: {user.email}</p>

              <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
                <button
                  className="btn text-white"
                  style={{ backgroundColor: '#91443f' }}
                  onClick={() => dispatch(logout())} >
                  Logout
                </button>
              </div>
            </>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}
export default Dashboard;
