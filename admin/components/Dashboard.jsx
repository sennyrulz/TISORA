import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logout } from "../src/redux/adminAuthSlice"
import { setAdmin } from "../src/redux/adminAuthSlice"; 


function Dashboard () {
  const navigate = useNavigate();  
  const dispatch = useDispatch();

  const { admin, isAuthenticated } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);


  // Redirect to login if no longer authenticated
useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:5001/admin/verify", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not logged in");

      const data = await res.json();
      dispatch(setAdmin(data)); // ✅ Restore admin session
    } catch (err) {
      dispatch(logout());
      navigate('/');
    }
  };

  checkAuth();
  }, [isAuthenticated, navigate]);
 
   const handleLogout = () => {
     dispatch(logout());
     navigate('/'); // ✅ Navigate after logout
   };

  return (
    <div>
      <h1 className="mb-3 pt-md-5 pb-md-3 fw-normal" style={{ fontSize: "3rem" }}>
        Admin Dashboard
      </h1>

      {isAuthenticated && admin ? (
            <>
              <p>{admin?.id}</p>
              <p>Welcome, {admin?.name}!</p>
              <p>{admin?.email}</p>
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
        <p>You are not logged in.</p>
      )}
    </div>
  )
}
export default Dashboard