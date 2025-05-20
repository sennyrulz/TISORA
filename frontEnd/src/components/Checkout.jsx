import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image1 from "../assets/American_Express.png";
import image2 from "../assets/Diners_Club.png";
import image3 from "../assets/mastercard.png";
import image4 from "../assets/Visa.png";

const Checkout = () => {
  const [formData, setFormData] = useState({
    email: "",
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    shippingMethod: "standard",
    saveInfo: false,
    emailOffers: false,
    billingSameAsShipping: true,
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
  });

  const [errors, setErrors] = useState({});

  const cartItems = useSelector((state) => state.cart.cart); // Access cart correctly
  const dispatch = useDispatch();

  // Calculate total dynamically
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [discountCode, setDiscountCode] = useState("");

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      toast.error("Please enter a discount code.");
      return;
    }
    toast.success("Discount code applied successfully!");
    // Add discount code logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Form Data Submitted:", formData);
    toast.success("Order Placed! Proceeding to payment...");
  };

  return (
    <Container className="my-5 pt-5">
      <Row className="justify-content-center">
        {/* Left Column - Form */}
        <Col md={7} className="pe-5">
          {/* Form Structure */}
          <Row className="justify-content-between mb-2">
            <Col className="text-start">
              <h5>Contact</h5>
            </Col>
            <Col className="text-end">
              <a
                href="/login"
                className="text-decoration-underline"
                style={{ color: "black" }}
              >
                Log in
              </a>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="emailOffers">
            <Form.Check
              type="checkbox"
              label="Email me with news & offers"
              className="text-start"
              name="emailOffers"
              checked={formData.emailOffers}
              onChange={handleChange}
            />
          </Form.Group>

          <h5 className="mb-3 text-start">Delivery</h5>

          <Form.Group className="mb-3" controlId="country">
            <Form.Select
              name="country"
              value={formData.country}
              onChange={handleChange}
              isInvalid={!!errors.country}
            >
              <option value="" disabled selected>
                Country/Region
              </option>
              <option value="NG">Nigeria</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="CA">Canada</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.country}
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="address">
            <Form.Control
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="apartment">
            <Form.Control
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Select
                name="state"
                value={formData.state}
                onChange={handleChange}
                isInvalid={!!errors.state}
              >
                <option value="" disabled selected>
                  State
                </option>
                <option value="Lagos">Lagos</option>
                <option value="Kano">Kano</option>
                <option value="Abuja">Abuja</option>
                <option value="Imo">Imo</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.state}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Postal Code (optional)"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Form.Group className="mb-4" controlId="phone">
            <Form.Control
              type="text"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <h5 className="mb-3 text-start">Shipping Method</h5>

          {["standard", "oneDay", "express"].map((method, idx) => {
            const labelMap = {
              standard: "Standard Shipping (3-5 business days)",
              oneDay: "One-Day Shipping (1 business day)",
              express: "Express Shipping (2-3 business days)",
            };
            return (
              <Form.Group
                className="mb-3 text-start"
                key={idx}
                controlId={`shipping-${method}`}
              >
                <Form.Check
                  type="radio"
                  label={labelMap[method]}
                  name="shippingMethod"
                  value={method}
                  checked={formData.shippingMethod === method}
                  onChange={handleChange}
                />
              </Form.Group>
            );
          })}

          <Form.Group className="mb-4" controlId="saveInfo">
            <Form.Check
              type="checkbox"
              label="Save this information for next time"
              className="text-start"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleChange}
            />
          </Form.Group>

          <h5 className="mb-3 text-start">Payment</h5>
          <p className="text-start">All transactions are secured & encrypted</p>
          <Row
            className="border p-2 rounded mb-4"
            style={{ backgroundColor: "#f0f0f0" }}
          >
            <Row className="mb-3 justify-content-between">
              <Col>
                <h6 className="text-start fw-normal mt-2">Credit Card</h6>
              </Col>
              <Col className="text-end">
                <Image
                  src={image1}
                  alt="American Express"
                  style={{ width: "40px" }}
                />
                <Image
                  src={image2}
                  alt="Diners Club"
                  style={{ width: "40px" }}
                />
                <Image
                  src={image3}
                  alt="Mastercard"
                  style={{ width: "40px" }}
                />
                <Image src={image4} alt="Visa" style={{ width: "40px" }} />
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="cardNumber">
              <Form.Control
                type="text"
                placeholder="Card Number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                isInvalid={!!errors.cardNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cardNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Expiration Date (MM/YY)"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  isInvalid={!!errors.cardExpiry}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cardExpiry}
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Security Code"
                  name="cardCvc"
                  value={formData.cardCvc}
                  onChange={handleChange}
                  isInvalid={!!errors.cardCvc}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cardCvc}
                </Form.Control.Feedback>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="cardName">
              <Form.Control
                type="text"
                placeholder="Name on Card"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                isInvalid={!!errors.cardName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cardName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="billingSameAsShipping">
              <Form.Check
                type="checkbox"
                label="Use shipping address as billing address"
                className="text-start"
                name="billingSameAsShipping"
                checked={formData.billingSameAsShipping}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Button
            type="submit"
            className="btn btn-dark bg-black rounded-0 w-100 p-2"
          >
            Pay Now
          </Button>
        </Col>

        {/* Right Column - Order Summary */}
        <Col md={5} className="ps-5" style={{ backgroundColor: "#f0f0f0" }}>
          {/* Order details Structure */}
          {cartItems.map((product) => (
            <Row
              key={product.id}
              className="align-items-center my-5 pe-4 text-start"
            >
              <Col xs={3}>
                <div
                  style={{
                    position: "relative",
                    width: "70px",
                    height: "70px",
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={70}
                    height={70}
                    className="mt-2"
                    style={{ objectFit: "cover", borderRadius: "0.25rem" }}
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "3px",
                      right: "-5px",
                      backgroundColor: "black",
                      color: "white",
                      fontSize: "12px",
                      padding: "2px 6px",
                      borderRadius: "999px",
                      fontWeight: "bold",
                      lineHeight: "1",
                    }}
                  >
                    {product.quantity}
                  </div>
                </div>
              </Col>
              <Col>
                <p className="mb-1 fw-semibold">{product.productName}</p>
                <small>Size: {product.size || "M"}</small>
              </Col>

              <Col className="text-end">
                <p className="mb-0">
                  ₦{(product.price * product.quantity).toLocaleString()}
                </p>
              </Col>
            </Row>
          ))}

          <Form className="my-4 pe-4">
            <Row className="gx-2">
              <Col xs={9}>
                <Form.Control
                  type="text"
                  placeholder="Discount code or gift card"
                  className="rounded-0 p-2"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
              </Col>
              <Col xs={3}>
                <Button
                  variant="dark"
                  className="w-100 rounded-0 p-2"
                  onClick={handleApplyDiscount}
                >
                  Apply
                </Button>
              </Col>
            </Row>
          </Form>

          <Row className="mb-2 pe-4">
            <Col className="text-start fw-semibold">Subtotal</Col>
            <Col className="text-end">₦{calculateTotal().toLocaleString()}</Col>
          </Row>

          <Row className="mb-2 pe-4">
            <Col className="text-start fw-semibold">Shipping</Col>
            <Col className="text-end">
              {formData.shippingMethod === "standard" && "₦3000 "}
              {formData.shippingMethod === "oneDay" &&
                "₦5,000"}
              {formData.shippingMethod === "express" &&
                "₦7,500"}
            </Col>
          </Row>

          <Row className="mb-2 pe-4">
            <Col className="text-start fw-semibold">Total</Col>
            <Col className="text-end">
              ₦
              {(
                calculateTotal() +
                (formData.shippingMethod === "standard"
                  ? 3000
                  : formData.shippingMethod === "oneDay"
                  ? 5000
                  : formData.shippingMethod === "express"
                  ? 7500
                  : 0)
              ).toLocaleString()}
            </Col>
          </Row>
        </Col>
      </Row>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
      />
    </Container>
  );
};

export default Checkout;
