import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { signUp, login, logout } from "../redux/userAuthSlice";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";


function Dashboard () {
  const navigate = useState();
  const userState = useSelector((state) => state.user);
  const user = userState?.user;
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  // Redirect to login if no longer authenticated
  useNavigate(() => {
    if (!isAuthenticated) {
      navigate('/user/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
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
              onClick={() => {
                dispatch(logout());
                ("/user/login");
              }
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