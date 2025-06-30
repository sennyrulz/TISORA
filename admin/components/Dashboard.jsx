import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { signUp, login, logout } from "../src/redux/adminAuthSlice"
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";

function Dashboard () {
  const navigate = useState();
  const admin = useSelector((state) => state.admin);
  const isAuthenticated = useSelector((state) => state.admin.isAuthenticated);
  const dispatch = useDispatch();

  // Redirect to login if no longer authenticated
  useNavigate(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1 className="mb-3 pt-md-5 pb-md-3 fw-normal" style={{ fontSize: "3rem" }}>
        admin Dashboard
      </h1>

      {isAuthenticated && admin ? (
        <>
          <p>ID: {admin.id || admin._id}</p>
          <p>Welcome, {admin.fullName || admin.name}!</p>
          <p>Email: {admin.email}</p>
          <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
            <button style = {{ 
              backgroundColor: '#91443f',
              color: 'white' }}
              className="btn"
              onClick={() => dispatch(logout()) 
              }>Logout
            </button>
          </div>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  )
}
export default Dashboard