import { useSelector, useDispatch } from "react-redux";
import { signUp, login, logout } from "../store/adminAuthSlice.js";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";


function adminDashboardLanding () {

const admin = useSelector((state) => state.admin.admin);
  const isAuthenticated = useSelector((state) => state.admin.isAuthenticated);
  const dispatch = useDispatch();
  
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
                    onClick={() => dispatch(logout()
                    )}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <p>You are not logged in.</p>
          )}
   
    </div>
  )
}

export default adminDashboardLanding