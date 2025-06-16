// components/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("userToken"); // adjust as needed
        const res = await axios.get("/api/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="mb-3">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="mb-3">
              <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
              <br />
              <strong>Status:</strong> {order.paymentStatus}
              <ul>
                {order.products.map((p, i) => (
                  <li key={i}>
                    {p.product.productName} (Qty: {p.quantity}) — ₦{p.product.price}
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

export default Orders;
