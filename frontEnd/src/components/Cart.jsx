import React, { useMemo, useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, incrementQuantity, decrementQuantity } from "../redux/cartSlice";
import deleteIcon from "../assets/bin_icon.png";
import { useNavigate } from "react-router-dom";
import AuthSidebar from "./AuthSidebar";

const calculateTotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const userState = useSelector((state) => state.user);
  const isAuthenticated = userState?.isAuthenticated;
  const [showAuthSidebar, setShowAuthSidebar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subtotal = useMemo(() => calculateTotal(cart), [cart]);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowAuthSidebar(true);
    } else {
      navigate('/Checkout');
    }
  };

  return (
    <Container className="my-5 pt-3 px-4 px-sm-4">
      <AuthSidebar 
        isOpen={showAuthSidebar} 
        onClose={() => setShowAuthSidebar(false)} 
      />
      <div className="my-4 pt-5 w-90 mx-auto">
        {cart.length === 0 ? (
          <div className="text-center py-5 my-4">
            <h1 className="fs-1 mb-5">Your cart is empty</h1>
            <a href="/shop">
              <Button 
                className="btn rounded-0 px-5 py-2" 
                style={{ 
                  backgroundColor: '#91443f', 
                  color: 'white',
                  border: 'none'
                }}
              >
                Continue Shopping
              </Button>
            </a>
            <div className="mt-5">
              <h2>Have an account?</h2>
              <p>
                <a href="/AuthPage" className="fw-semibold text-black">

                  Login
                </a>{" "}to checkout faster
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Top Bar */}
            <div className="d-flex justify-content-between">
              <h2 className="fw-semibold mb-5 text-start">Your cart</h2>
              <a href="/shop" className="text-black mt-1">Continue Shopping</a>
            </div>

            {/* Subheadings */}
            <Row className="text-muted fw-normal mb-3 d-flex small">
              <Col xs={7} className="text-start">PRODUCTS</Col>
              <Col xs={3} className="text-start d-none d-md-block">QUANTITY</Col>
              <Col xs={5} md={2} className="text-end">TOTAL</Col>
            </Row>
            <hr className="mb-4" />

            {/* Cart Items */}
            {cart.map((product) => (
              <Row key={product.id} className="align-items-center py-3 border-bottom">
                <Col xs={7} className="d-flex align-items-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="me-4"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                  <div className="text-start w-100 w-md-auto">
                    <p className="m-0 fw-semibold" style={{ fontSize: "1.1rem" }}>
                      {product.productName}
                    </p>
                    <p className="m-0 text-muted small">
                      ₦{(product.price * product.quantity).toLocaleString()}
                    </p>
                    <p className="m-0 text-muted small">
                      Size: {product.sizes}
                    </p>
                    {/* Mobile-only: Quantity controls under sizes */}
                    <div className="d-md-none mt-4 d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center"
                        style={{ border: "1px solid #ccc", padding: "4px 8px", gap: "10px",}}
                      >
                        <button onClick={() => dispatch(decrementQuantity({ id: product.id }))}
                          style={{ border: "none", background: "transparent", fontSize: "1rem",}}
                          className="p-0 px-1 d-flex align-items-center justify-content-center small"
                        >
                          -
                        </button>
                        
                        <span className="small"
                          style={{ minWidth: "20px", textAlign: "center", fontSize: "1rem",}}
                        >
                          {product.quantity}
                        </span>
                        
                        <button onClick={() => dispatch(incrementQuantity({ id: product.id }))}
                          style={{ border: "none", background: "transparent", fontSize: "1rem",}}
                          className="p-0 px-1 d-flex align-items-center justify-content-center small"
                        >
                          +
                        </button>
                      </div>
                      
                      <Button variant="link"
                        onClick={() => dispatch(removeFromCart(product.id))}
                        className="p-0 border-0">
                        <img src={deleteIcon} alt="delete icon" width={20} height={20} />
                      </Button>
                    </div>
                  </div>
                </Col>

                <Col xs={3}>
                  <div className="d-none d-md-flex align-items-center gap-3">
                    <div
                      className="d-flex align-items-center rounded-0"
                      style={{ border: "1px solid #ccc", padding: "4px 8px", gap: "10px"}}>
                      <button onClick={() => dispatch(decrementQuantity({ id: product.id }))}
                        style={{border: "none", background: "transparent",fontSize: "1rem"}}
                        className="p-0 px-0 p-md-0 px-md-1 d-flex align-items-center justify-content-center small">
                          -
                      </button>
                      <span className="small"
                        style={{minWidth: "20px", textAlign: "center", fontSize: "1rem"}}>
                          {product.quantity}
                      </span>
                      <button onClick={() => dispatch(incrementQuantity({ id: product.id }))}
                        style={{border: "none", background: "transparent", fontSize: "1rem"}}
                        className="p-0 px-1 d-flex align-items-center justify-content-center small">
                          +
                      </button>
                    </div>
                    <Button variant="link"
                      onClick={() => dispatch(removeFromCart(product.id))}
                      className="p-0 border-0"
                    >
                      <img src={deleteIcon} alt="delete icon" width={20} height={20}/>
                    </Button>
                  </div>
                </Col>

                <Col xs={2} className="d-flex flex-column align-items-end">
                  <div className="mt-2">
                    ₦{(product.price * product.quantity).toLocaleString()}
                  </div>
                </Col>
              </Row>
            ))}

            {/* Checkout Section */}
            <Row className="mt-5">
              {/* Left: Textarea for instructions */}
              <Col md={6} className="mb-4 mb-md-0 text-start">
                <div style={{ maxWidth: "400px", width: "100%" }}>
                  <label className="form-label fw-semibold mb-2 text-muted">
                    Order special instructions
                  </label>
                  <textarea className="form-control rounded-0"
                  rows={5}
                  placeholder="Write any special requests or delivery instructions..."
                  style={{ border: "1.4px solid #aaa", padding: "8px" }}
                  ></textarea>
                </div>
              </Col>

              {/* Right: Checkout summary */}
              <Col md={6}>
                <div className="d-flex justify-content-center justify-content-sm-end w-100 mt-4">
                  <div id="second-block" className="text-end">
                    <div className="d-flex justify-content-between">
                      <p>Subtotal</p>
                      <p id="Subtotal">₦{subtotal.toLocaleString()} NGN</p>
                    </div>
                    <div>
                      Taxes and{" "}
                      <a href="/shipping-policy" className="text-decoration-underline">
                        shipping
                      </a>{" "}calculated at checkout
                    </div>
                    <Button 
                      onClick={handleCheckout}
                      className="btn rounded-0 py-2 w-100 my-4" 
                      style={{ 
                        backgroundColor: '#91443f',
                        color: 'white',
                        border: 'none'
                      }}
                    >
                      PROCEED TO CHECKOUT
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>
    </Container>
  );
};

export default Cart;
