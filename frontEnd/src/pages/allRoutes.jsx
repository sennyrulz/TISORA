import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/userSlice";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";

function User() {
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container style={{ marginTop: "150px", marginBottom: "100px", paddingTop: "20px" }}>
      {/* Adjust the padding-top value here */}
      <Row className="justify-content-center">
        <Col md={{ span: 6, offset: 2 }} className="text-start">
          <h1 className="mb-3 pt-md-5 pb-md-3 fw-normal" style={{ fontSize: "3rem" }}>
            USER PROFILE
          </h1>

          {isAuthenticated ? (
            <>
              <p>Welcome, {user.name}!</p>
              <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
                <button onClick={() => dispatch(logout())}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <label htmlFor="username">Username or Email</label>
              <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}/>

              <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-control mb-3"/>

                <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
                <button className="btn btn-primary" onClick={() => dispatch(login({
                name: username,
                email: `${username}@example.com`, // ✅ dynamic mock email
                }))}> Login
                </button>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default User;
