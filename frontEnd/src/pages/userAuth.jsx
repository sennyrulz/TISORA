import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUp, login, logout } from "../redux/userAuthSlice";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";

function UserAuthPage() {
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

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    console.log("Auth status changed:", isAuthenticated, user);
    if (isAuthenticated) {
      navigate("/DashboardLanding");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("🚀 Sending login request with:", formData);

    try {
      if (isLogin) {
        const loginData = {
        email: formData.email,
        password: formData.password,
      };

  const resultAction = await dispatch(login(loginData));
    if (login.fulfilled.match(resultAction)) {
    toast.success("Login successful");
    navigate("/DashboardLanding");
   } else {
    toast.error(resultAction.payload || "User does not exist! Sign up");
    }
  } else {
    const resultAction = await dispatch(signUp(formData));
    if (signUp.fulfilled.match(resultAction)) {
    toast.success("Signup successful");

    // Reset form and navigate to login
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      password: ""
    });
    navigate("/userAuth");
    } else {
      toast.error(resultAction.payload || "Signup failed");
    }
  }
  } catch (error) {
    toast.error(error.message || "Invalid credentials!!");
  } finally {
    setLoading(false);
  }
};

  return (
    <Container style={{ marginTop: "150px", marginBottom: "100px", paddingTop: "20px" }}>
      <Row className="justify-content-center">
        <Col md={{ span: 6, offset: 2 }} className="text-start">
          <h1 className="mb-3 pt-md-5 pb-md-3 fw-normal" style={{ fontSize: "3rem" }}>
            {isLogin ? "Login" : "Sign Up"}
          </h1>

          {isAuthenticated ? (
            <>
              <p>{user?.id}</p>
              <p>Welcome, {user?.name}!</p>
              <p>{user?.email}</p>
              <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
                <button
                  style={{ backgroundColor: '#91443f' }}
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
            <>
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
                        name="phone"
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
                    autoComplete="off"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: '#91443f',
                    border: 'none',
                    width: '100%'
                  }}
                  className="btn btn-primary"
                  disabled={loading}>
                  {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
                </button>
              </form>

              <p className="mt-4">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button className="btn btn-link p-0" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </>
          )}
        </Col>
      </Row>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar closeOnClick />
    </Container>
  );
}

export default UserAuthPage;
