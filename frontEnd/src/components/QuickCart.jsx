import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import deleteIcon from '../assets/bin_icon.png';
import { RiCloseFill } from "react-icons/ri";

const QuickCart = ({ isOpen, onClose }) => {
  const cart = useSelector((state) => state.cart?.cart || []);
  const dispatch = useDispatch();
  const quickCartRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (quickCartRef.current && !quickCartRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scrolling when cart is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Re-enable body scrolling when cart is closed
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
        }}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
        ref={quickCartRef}
        className="quick-cart"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '400px',
          height: '100vh',
          backgroundColor: 'white',
          boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease-in-out',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Header */}
        <div 
          className="d-flex justify-content-between align-items-center p-3 border-bottom"
        >
          <h5 className="mb-0 ">Shopping Cart</h5>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1rem',
              cursor: 'pointer',
              padding: '0',
            }}
          >
            <RiCloseFill className="fs-4" />
          </button>
        </div>

        {/* Cart Items empty State */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', marginTop: '20px' }}>
          {cart.length === 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%', marginTop: '-40px' }}>
              <h5 className="mb-4">Your cart is empty</h5>
              <button
                onClick={() => {
                  onClose();
                  navigate('/shop');
                }}
                className="btn rounded-0 px-5 py-2"
                style={{ backgroundColor: '#91443f', color: 'white' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            // Cart Items List when not empty
            <div className="quick-cart-items" style={{ flex: 1, overflowY: 'auto' }}>
              {[...cart].reverse().map((item) => (
                <div key={item.id} className="quick-cart-item p-3 border-bottom">
                  <div className="d-flex justify-content-between">
                    {/* Left side: Image and Product Info */}
                    <div className="d-flex" style={{ width: '80%' }}>
                      <Image
                        src={item.image}
                        alt={item.productName}
                        width={100}
                        height={100}
                        style={{ objectFit: 'cover' }}
                        className="me-3"
                      />
                      <div>
                        <p className="mb-1 fw-semibold text-start">{item.productName}</p>
                        <p className="mb-1 fw-semibold text-start">₦{item.price.toLocaleString()}</p>
                        <p className="mb-1 text-muted small text-start">Size: {item.sizes}</p>
                        
                        {/* Quantity Controls */}
                        <div className="d-flex align-items-center pt-3">
                          <div
                            className="d-flex align-items-center"
                            style={{ 
                              border: "1px solid #ccc",
                              padding: "4px 8px", 
                              gap: "10px"
                            }}
                          >
                            <button 
                              onClick={() => dispatch(decrementQuantity({ id: item.id }))}
                              style={{
                                border: "none", 
                                background: "transparent",
                                fontSize: "1rem",
                              }}
                              className="p-0 px-1"
                            >
                              -
                            </button>
                            <span style={{ minWidth: "20px", textAlign: "center" }}>
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => dispatch(incrementQuantity({ id: item.id }))}
                              style={{
                                border: "none", 
                                background: "transparent",
                                fontSize: "1rem",
                              }}
                              className="p-0 px-1"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Delete button */}
                    <div className="d-flex align-items-start">
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '0',
                          cursor: 'pointer',
                        }}
                      >
                        <img src={deleteIcon} alt="delete" width={20} height={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Only show if cart has items */}
        {cart.length > 0 && (
          <div className="p-4 border-top">
            <div className="d-flex justify-content-between mb-3">
              <span className="fw-semibold">Subtotal</span>
              <span className="fw-semibold">
                ₦{cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}
              </span>
            </div>
            
            <div className="d-grid gap-2">
              <button
                onClick={() => {
                  onClose();
                  navigate('/cart');
                }}
                className="btn rounded-0 py-2"
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
                }}
              >
                View Cart
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
                className="btn rounded-0 py-2"
                style={{ backgroundColor: '#91443f', color: 'white' }}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuickCart; 