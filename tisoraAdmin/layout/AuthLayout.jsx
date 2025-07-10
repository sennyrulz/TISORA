import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Logo or Branding */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-500">Sign in to continue</p>
        </div>

        {/* Renders Login or Signup component */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;