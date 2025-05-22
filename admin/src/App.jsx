import React from 'react'
import { useState } from 'react'
import './App.css'
import AdminAuth from "../../admin/pages/AdminAuth"
import { BrowserRouter as Routes, Route, Link } from "react-router-dom";
import Dashboard from '../pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)
  const isAuthenticated = !!localStorage.getItem("adminToken"); 
  return (
    <>
      <div className='grid-container'>
        <Route>
          <Routes>
            {/* Admin Login Route */}
            <Route path="/" element={<AdminAuth />} />

            {/* Protected Dashboard Route */}
            <Route
              path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
              }
            />
          </Routes>
      </Route>
      </div>
    </>
  )}
 
export default App
