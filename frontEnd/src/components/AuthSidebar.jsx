import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUp, login, logout } from "../redux/userAuthSlice";
import { toast, ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";
import { X } from 'lucide-react';

function AuthSidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const user = userState?.user;
  const isAuthenticated = userState?.isAuthenticated;
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        const resultAction = await dispatch(login(formData)).unwrap();
        toast.success("Login successful");
        onClose();
        await new Promise(resolve => setTimeout(resolve, 300)); // Wait 300ms
        navigate("/DashboardLanding");
      } else {
        const resultAction = await dispatch(signUp(formData)).unwrap();
        toast.success("Signup successful");
        onClose();
        navigate("/"); //come back and fix this so that User logs in again immediately after signin
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={`auth-sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <div className={`auth-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="auth-sidebar-content">
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
          
          <h2 className="mb-3">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          {isAuthenticated ? (
            <>
              <p>{user.id}</p>
              <p>Welcome, {user.name}!</p>
              <p>{user.email}</p> 
              <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
                <button style={{
                  backgroundColor: '#91443f'}} 
                  className="btn" 
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                    }}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className="mb-3 text-start">
                    <div className="mb-3">
                      <label>Full Name</label>
                      <input 
                        type="text"
                        name="fullName"
                        className="form-control"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label>Phone</label>
                      <input 
                        type="number"
                        name='phone'
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required 
                      />
                    </div>

                    <div className="mb-3">
                      <label>Address</label>
                      <input 
                        type="text"
                        name="address"
                        className="form-control"
                        value={formData.address}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="mb-3 text-start">
                <label>Email</label>
                <input 
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="mb-3 text-start">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>

              <button type="submit" 
                style={{
                  backgroundColor: '#91443f',
                  border: 'none',
                  width: '100%'
                }} 
                  className="btn btn-primary"
                   disabled={loading}>
                  {loading ? "loading..." : isLogin ? "Login" : "Sign Up"}
                </button>
            </form>
          )}

          <p className="mt-4 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              className="btn btn-link p-0" 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
      />
    </>
  );
}

export default AuthSidebar; 