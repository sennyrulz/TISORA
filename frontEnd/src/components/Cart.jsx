import React, { useMemo } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/cartSlice"; // Ensure the correct path
import deleteIcon from "../assets/bin_icon.png";

// Function to calculate total price
const calculateTotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart); // Access cart correctly
  const dispatch = useDispatch();

  const subtotal = useMemo(() => calculateTotal(cart), [cart]);

  return (
    <Container className="my-5 pt-3">
      <div className="my-4 pt-5 w-90 mx-auto">
        <h1
          className="mb-4 fw-normal text-center"
          style={{ fontSize: "3rem", letterSpacing: "0.1em" }}
        >
          CART
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-5">
            <p className="fs-5 text-muted">Your cart is empty</p>
            <a href="/shop">
              <Button className="btn btn-dark bg-black rounded-0 px-5 py-2">
                Continue Shopping
              </Button>
            </a>
          </div>
        ) : (
          cart.map((product) => (
            <Row
              key={product.id}
              className="align-items-center py-3 border-bottom"
            >
              <Col xs={6} className="d-flex align-items-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="me-3"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
                <div className="text-start w-100 w-md-auto">
                  <p className="m-0 fw-semibold" style={{ fontSize: "1.1rem" }}>
                    {product.productName}
                  </p>
                  <p className="m-0 text-muted small">
                    ₦{(product.price * product.quantity).toLocaleString()} NGN
                  </p>
                </div>
              </Col>
              <Col xs={3}>
                <div
                  className="d-flex align-items-center rounded-0"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    padding: "4px 8px",
                    width: "fit-content",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() =>
                      dispatch(decrementQuantity({ id: product.id }))
                    }
                    style={{
                      border: "none",
                      background: "transparent",
                      fontSize: "1rem",
                    }}
                    className="p-0 px-0 p-md-0 px-md-1 d-flex align-items-center justify-content-center small"
                  >
                    -
                  </button>
                  <span
                    style={{
                      minWidth: "20px",
                      textAlign: "center",
                      fontSize: "1rem",
                    }}
                    className="small"
                  >
                    {product.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(incrementQuantity({ id: product.id }))
                    }
                    style={{
                      border: "none",
                      background: "transparent",
                      fontSize: "1rem",
                    }}
                    className="p-0 px-1 d-flex align-items-center justify-content-center small"
                  >
                    +
                  </button>
                </div>
              </Col>
              <Col
                xs={2}
                className="d-flex justify-content-end align-items-center"
              >
                <Button
                  variant="link"
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="p-0 border-0"
                >
                  <img
                    src={deleteIcon}
                    alt="delete icon"
                    width={20}
                    height={20}
                  />
                </Button>
              </Col>
            </Row>
          ))
        )}

        <div className="text-end mt-3">
          <a href="/shop" className="text-black" >
              Continue Shopping
          </a>
        </div>

        {/* Checkout Section */}
        <div className="d-flex justify-content-center justify-content-sm-end mt-5 w-100">
          <div id="second-block" className="text-end">
            <div className="d-flex justify-content-between">
              <p>Subtotal</p>
              <p id="Subtotal">₦{subtotal.toLocaleString()} NGN</p>
            </div>
            <div>
              Taxes and{" "}
              <a href="/shipping-policy" className="text-decoration-underline">
                shipping
              </a>{" "}
              calculated at checkout
            </div>
            <a href="/Checkout">
              <Button
                variant="dark"
                className="w-100 my-4 bg-black rounded-0"
                // disabled={cart.length === 0}
              >
                PROCEED TO CHECKOUT
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
