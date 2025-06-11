import React, { useEffect, useState } from "react";  // useEffect from react
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUp, login, logout } from "../redux/userAuthSlice";
import { toast, ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";
import { X } from 'lucide-react';

function userAuthPage({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const user = userState?.user;
  const isAuthenticated = userState?.isAuthenticated;
  const [loading, setLoading] = useState(false);

  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: ""
  });
const [msg, setMsg] = useState("");

// Automatically navigate to dashboard when authenticated
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
      const resultAction = await dispatch(login(formData));
      if (login.fulfilled.match(resultAction)) {
        toast.success("Login successful");
        onClose();
        navigate("/Dashboard");
      } else {
        toast.error(resultAction.payload || "User does not exist! Please create an account");
      }
    } else {
      const resultAction = await dispatch(signUp(formData));
      if (signUp.fulfilled.match(resultAction)) {
        toast.success("Signup successful");
        // setMsg(res.message)
        onClose();
        navigate("/login");
      } else {
        toast.error(resultAction.payload || "Signup failed");
      }
    }
  } catch (error) {
    toast.error(error.message || "An error occurred");
    {msg && <div className={style.success_msg}>{msg}</div>}
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
              <p>Welcome, {user.name}!</p>
              <p>{user.email}</p> 
              <button 
                className="btn w-100"
                style={{ backgroundColor: '#91443f' }}
                onClick={() => {
                  dispatch(logout());
                  onClose();
                  navigate("/user/login");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
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
                </>
              )}

              <div className="mb-3">
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

              <div className="mb-3">
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

              <button 
                type="submit" 
                className="btn w-100"
                style={{ backgroundColor: '#91443f' }}
                disabled={loading}
              >
                {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
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
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          closeOnClick
        />
      </div>
    </>
  );
}

export default userAuthPage;
