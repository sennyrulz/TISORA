import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Card,
} from "react-bootstrap";
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
    <div className="container my-5 pt-5">
      <Row className="justify-content-center">
        {/* Left Column - Form */}
        <Col md={7} className="px-4">
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
                  isInvalid={!!errors.shippingMethod}
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

          <h5 className="fw-bold text-start mb-2">Payment Method</h5>
          <p className="text-muted text-start small mb-0">
            All transactions are <strong>secured</strong> and{" "}
            <strong>encrypted</strong>.
          </p>

          <Card className="p-4 mb-5 mt-4">
            <Row className="g-3">
              {/* Stripe Option */}
              <Col md={6}>
                <div
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "stripe" })
                  }
                  className={`border rounded-3 p-3 payment-option ${
                    formData.paymentMethod === "stripe" ? "selected" : ""
                  }`}
                  style={{
                    cursor: "pointer",
                    borderColor:
                      formData.paymentMethod === "stripe" ? "#000" : "#ccc",
                  }}
                >
                  <Form.Check
                    type="radio"
                    id="stripe"
                    label="Pay with Stripe (USD)"
                    name="paymentMethod"
                    value="stripe"
                    checked={formData.paymentMethod === "stripe"}
                    onChange={handleChange}
                  />
                  <div className="mt-2 d-flex gap-2 align-items-center justify-content-center">
                    <Image src={image3} alt="Mastercard" width={40} />
                    <Image src={image4} alt="Visa" width={40} />
                  </div>
                </div>
              </Col>

              {/* Paystack Option */}
              <Col md={6}>
                <div
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "paystack" })
                  }
                  className={`border rounded-3 p-3 payment-option ${
                    formData.paymentMethod === "paystack" ? "selected" : ""
                  }`}
                  style={{
                    cursor: "pointer",
                    borderColor:
                      formData.paymentMethod === "paystack" ? "#000" : "#ccc",
                  }}
                >
                  <Form.Check
                    type="radio"
                    id="paystack"
                    label="Pay with Paystack (₦NGN)"
                    name="paymentMethod"
                    value="paystack"
                    checked={formData.paymentMethod === "paystack"}
                    onChange={handleChange}
                  />
                  <div className="mt-2 d-flex gap-2 align-items-center justify-content-center">
                    <Image src={image3} alt="Mastercard" width={40} />
                    <Image src={image4} alt="Visa" width={40} />
                  </div>
                </div>
              </Col>
            </Row>
          </Card>

          <div className="d-none d-md-block">
            <Button
              type="submit"
              className="btn btn-dark bg-black rounded-0 w-100 p-2 mb-4"
            >
              Pay Now
            </Button>
          </div>
        </Col>

        {/* Right Column - Order Summary */}
        <Col
          md={5}
          style={{
            backgroundColor:
              window.innerWidth >= 768 ? "#f0f0f0" : "transparent",
          }}
        >
          <div className="d-block d-md-none mt-4">
            <h2 className="text-start">Order Summary</h2>
          </div>
          {/* Order details Structure */}
          {cartItems.map((product) => (
            <Row
              key={product.id}
              className="align-items-center my-5 ps-4 pe-4 text-start"
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
                      top: "-2px",
                      right: "-6px",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      color: "white",
                      fontSize: "12px",
                      padding: "2px 6px",
                      borderRadius: "999px",
                      fontWeight: "bold",
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

          <Form className="my-4 pe-4 ps-4">
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

          <Row className="mb-2 pe-4 ps-4">
            <Col className="text-start fw-semibold">Subtotal</Col>
            <Col className="text-end">₦{calculateTotal().toLocaleString()}</Col>
          </Row>

          <Row className="mb-2 pe-4 ps-4">
            <Col className="text-start fw-semibold">Shipping</Col>
            <Col className="text-end">
              {formData.shippingMethod === "standard" && "₦3000 "}
              {formData.shippingMethod === "oneDay" && "₦5,000"}
              {formData.shippingMethod === "express" && "₦7,500"}
            </Col>
          </Row>

          <Row className="mb-2 pe-4 ps-4">
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
        {/* Mobile-only Pay Button (below Order Summary) */}
        <div className="d-block d-md-none mt-3">
          <Button
            type="submit"
            className="btn btn-dark bg-black rounded-0 w-100 p-3"
          >
            Pay Now
          </Button>
        </div>
      </Row>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
      />
    </div>
  );
};

export default Checkout;
