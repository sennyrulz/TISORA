import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logout } from "../redux/userAuthSlice";
import { Container, Row, Col } from "react-bootstrap";

function Dashboard() {
  const navigate = useNavigate(); // ✅ Correct hook
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  // ✅ Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // ✅ Navigate after logout
  };

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
            <button
              style={{ backgroundColor: '#91443f', color: 'white' }}
              className="btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}

export default Dashboard;
