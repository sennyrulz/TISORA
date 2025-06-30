import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import AdminAuth from "../../admin/pages/AdminAuth"
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Dashboard from '../pages/DashboardLanding'
// import AdminLayout from '../layout/adminLayout';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function App() {
  const [count, setCount] = useState(0)
  const isAuthenticated = !!localStorage.getItem("adminToken"); 
  
  return (
    <>
    <Nav />
    <div className='grid-container'>
        <Routes>
          {/* Admin Login Route */}
            <Route path="/" element={<AdminAuth />} />

          {/* Protected Dashboard Route */}
            <Route
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
          }/>
        </Routes>
    </div>
     <Footer />
     </>
  
)}
 
export default App
