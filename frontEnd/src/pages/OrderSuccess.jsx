import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaReceipt, FaShoppingBag, FaEnvelope, FaCalendarAlt, FaHome, FaFilter, FaCalendar, FaSearch, FaBoxOpen, FaTag, FaEnvelopeOpen } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentData = location.state?.paymentData;

  // ✅ Parse metadata
const parsedOrder = typeof paymentData.order === "string"
  ? JSON.parse(paymentData.order)
  : paymentData.order;

const parsedCustomer = typeof paymentData.customer === "string"
  ? JSON.parse(paymentData.customer)
  : paymentData.customer;

console.log("✅ parsedOrder:", parsedOrder);
console.log("✅ parsedCustomer:", parsedCustomer);


  console.log('✅ paymentData:', paymentData);
  console.log('✅ items isArray:', Array.isArray(paymentData?.order?.items));

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center mt-5 py-5">
      <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card-body text-center p-5">
          <div className="mb-4">
            <FaCheckCircle style={{ color: '#91443f', fontSize: '4rem' }} />
          </div>
          
          <h1 className="card-title mb-4" style={{ color: '#91443f' }}>
            Order Confirmation!
          </h1>
          
          <p className="card-text text-muted mb-4">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          {paymentData && (
            <div className="payment-details mb-4">
              <div className="row g-3">
                <div className="col-12">
                  <div className="p-4 border rounded">
                    <div className="d-flex align-items-center mb-4">
                      <FaReceipt style={{ color: '#91443f' }} className="me-2" />
                      <h6 className="mb-0">Order Details</h6>
                    </div>
                    <hr className="my-4" />
                    
                    {parsedOrder?.items?.length > 0 ? (
                        parsedOrder.items.map((item, index) => (
                          <div key={item.id || item._id || index} className="d-flex justify-content-between align-items-start mb-3">
                            <div className="mb-4">
                              <div className="text-start">
                                <p className="mb-0 fw-medium">{item.productName || "Unamed product"}</p>
                              </div>
                              <div className="text-end">
                                <p className="mb-1 fw-medium">Price: ₦{item.price?.toLocaleString()}</p>
                                <p className="mb-0 fw-medium">Quantity: {item.quantity || 1}</p>
                              </div>
                            </div>
                          </div>
                        ))
                        ) : (
                        <p className="mb-0 fw-medium">N/A</p>
                      )}
                    <hr className="my-4" />

                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-2">
                        <FaTag style={{ color: '#91443f' }} className="me-2" />
                        <p className="text-muted mb-0">Order Reference</p>
                      </div>
                      <p className="mb-0 text-start fw-medium">{paymentData.reference}</p>
                    </div>

                    <hr className="my-4" />

                    {paymentData.order?.specialInstructions && (
                      <>
                        <div className="mb-4">
                          <div className="d-flex align-items-center mb-2">
                            <FaBoxOpen style={{ color: '#91443f' }} className="me-2" />
                            <p className="text-muted mb-0">Special Instructions</p>
                          </div>
                          <p className="mb-0 text-start fw-medium">{paymentData.order.specialInstructions}</p>
                        </div>
                        <hr className="my-4" />
                      </>
                    )}

                    <div>
                      <div className="d-flex align-items-center mb-2">
                        <FaEnvelopeOpen style={{ color: '#91443f' }} className="me-2" />
                        <p className="text-muted mb-0">Confirmation Email</p>
                      </div>
                      <p className="mb-0 text-start fw-medium">Sent to {paymentData.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 text-center">
            <Link to="/shop" className="btn me-3 rounded-0 py-2" style={{ backgroundColor: '#91443f', color: 'white' }}>
              Continue Shopping
            </Link>
            <Link to="/OrdersLanding" className="btn rounded-0 py-2"
                style={{ 
                  borderColor: '#91443f', 
                  color: '#91443f',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#91443f';
                  e.target.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#91443f';
                }}>
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess; 