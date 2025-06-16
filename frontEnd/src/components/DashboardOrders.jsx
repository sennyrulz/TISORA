import React, { useEffect, useState } from "react";
import axios from "axios";

function DashboardOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     const token = localStorage.getItem("userToken");

  //     if (!token) {
  //       setError("User not logged in.");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const res = await axios.get("/users/orders/my-orders", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       console.log("Fetched orders response:", res.data);

  //       // CASE 1: res.data is an object like { orders: [...] }
  //       if (Array.isArray(res.data)) {
  //         setOrders(res.data);
  //       } else if (Array.isArray(res.data.orders)) {
  //         setOrders(res.data.orders);
  //       } else {
  //         setError("Unexpected response format from backend.");
  //         console.error("Unexpected format:", res.data);
  //       }
  //     } catch (err) {
  //       console.error("Fetch error:", err?.response?.data || err.message);
  //       setError("Failed to load orders.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

  // if (loading) return <p>Loading your orders...</p>;
  // if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="mb-3">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map((order) => (
            <li key={order._id} className="mb-4 border p-3 rounded">
              <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()} <br />
              <strong>Status:</strong> {order.paymentStatus || "Pending"}
              <ul>
                {order.products.map((p, i) => (
                  <li key={i}>
                    {p.product?.productName || "Unnamed Product"} (Qty: {p.quantity}) — ₦{p.product?.price || "0"}
                  </li>
                ))}
              </ul>
              <strong>Total:</strong> ₦{order.totalAmount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DashboardOrders;
