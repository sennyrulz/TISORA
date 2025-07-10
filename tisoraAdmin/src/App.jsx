import { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { setUser } from '../redux/adminAuthSlice'; // or wherever it's located
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import AdminAuth from "../pages/AdminAuth"
import OrdersLanding from '../pages/ordersLanding';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import AdminDashboardLanding from "../pages/adminDashboardLanding";
// import AdminLayout from '../layout/adminLayout';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function App() {
    const dispatch = useDispatch();
  
    useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/current-user`, 
          { credentials: "include"});
        if (res.ok) {
          const data = await res.json();
          dispatch(setUser(data));
        }
      } catch (err) {
        console.log("Not authenticated");
      }
    };
  
    fetchUser();
  }, []);
  const [count, setCount] = useState(0)
  const isAuthenticated = !!localStorage.getItem("adminToken"); 
  
  return (
    <>
      <Nav />
        <div className='grid-container'>
          <Routes>
            {/* Admin Login Route */}
              <Route path="/" element={<AdminAuth />} />
              {/* Protected Admin Dashboard Route */}
              <Route 
              path="/adminDashboardLanding" 
              element={isAuthenticated ? <AdminDashboardLanding /> : <Navigate to="/" />}
              />
              <Route 
              path="/OrdersLanding" 
                element={isAuthenticated ? <OrdersLanding /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      <Footer />
    </>
  
)}
 
export default App
