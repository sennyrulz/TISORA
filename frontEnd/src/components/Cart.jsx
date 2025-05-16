import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice"; // Ensure the correct path


// Function to calculate total price
const calculateTotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const Cart = () => {
  const cart = useSelector(state => state.cart.cart); // Access cart correctly
  const dispatch = useDispatch();

  return (
  <Container className="mt-5" style={{ marginTop: "150px", marginBottom: "100px", paddingTop: "20px" }}>
    <div className="my-4 pt-5 w-90 mx-auto" >
      <h1 className="mb-3 pt-md-5 pb-md-3 fw-normal" style={{ fontSize: "3rem" }}>
            CART
      </h1>

        {cart.length === 0 ? (
          <p>Cart is Empty</p>
        ) : (
          cart.map(product => (
            <Row key={product.id} className="align-items-center py-3 border-bottom">
              <Col xs={6} className="d-flex align-items-center">
                <Image src={product.image} alt={product.name} width={50} height={50} className="me-3" />
                <p className="m-0">{product.name}</p>
              </Col>
              <Col xs={3} className="d-none d-sm-block">
                <p className="m-0">{product.quantity}</p>
              </Col>
              <Col xs={2} className="d-flex justify-content-between align-items-center">
                <p className="m-0">₦{(product.price * product.quantity).toLocaleString()} NGN</p>
                <Button
                  variant="dark"
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="ms-2">
                  Clear
                </Button>
              </Col>
            </Row>
          ))
        )}

        {/* Checkout Section */}
        <div className="d-flex justify-content-center justify-content-sm-end my-5 w-100">
          <div id="second-block" className="text-end">
            <div className="d-flex justify-content-between">
              <p>Subtotal</p>
              <p id="Subtotal">₦{calculateTotal(cart).toLocaleString()} NGN</p>
            </div>
            <div>
              Taxes and <a href="/shipping-policy" className="text-decoration-underline">shipping</a> calculated at checkout
            </div>
            <a href="/Checkout">
              <Button variant="dark" className="w-100 my-4 discover_button">
                Check Out
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
