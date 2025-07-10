import React from 'react';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
// import Topbar from './Topbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Nav />

      {/* Sidebar navigation */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Top bar */}
        <Topbar />

        {/* Main content area for nested routes */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
