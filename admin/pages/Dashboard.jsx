// Dashboard.jsx
import React, { useEffect, useState } from "react";  // useEffect from react
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUp, login, logout } from "../store/adminAuthSlice.js";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import Sidebar from "../components/Sidebar"

function Dashboard() {
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

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
                <button style = {{ 
                    backgroundColor: '#91443f',
                    color: 'white' }}
                    className="btn"
                    onClick={() => dispatch(logout())}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <p>You are not logged in.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;

