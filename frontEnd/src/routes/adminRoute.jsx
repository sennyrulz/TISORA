import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayouts";
import ProtectedRoute from "../../../admin/routes/ProtectedRoute";
import AdminAuthPage from "../../../admin/pages/AdminAuthPage";
import Dashboard from "../../../admin/pages/Dashboard";
import Users from "../../../admin/pages/Users";
import Products from "../../../admin/pages/Products";
import Orders from "../../../admin/pages/Orders";
import Inventories from "../../../admin/pages/Inventories";
import Settings from "../../../admin/pages/Settings";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public route for authentication */}
      <Route path="/admin/auth" element={<AdminAuthPage />} />

      {/* Protected admin routes */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Nested routes rendered inside AdminLayout */}
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} />
        <Route path="inventories" element={<Inventories />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
