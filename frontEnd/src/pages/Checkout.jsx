import React, { useState } from "react";
import axios from 'axios'
import { Container, Row, Col, Form, Button, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image1 from "../assets/american_express.C3z4WB9r.svg";
import image2 from "../assets/mpesa.C3NjGMBV.svg";
import image3 from "../assets/master.CzeoQWmc.svg";
import image4 from "../assets/visa.sxIq5Dot.svg";
import image5 from "../assets/web.png";
import image6 from "../assets/ozow.BrS1cEol.svg";
import CheckOut from "../../../backEnd/models/checkOutModel";
import { signUp, login, logout } from "../redux/authSlice";

const Checkout = () => {
  // const [formData, setFormData] = useState({
  //   email: "",
  //   country: "",
  //   firstName: "",
  //   lastName: "",
  //   address: "",
  //   apartment: "",
  //   city: "",
  //   state: "",
  //   postalCode: "",
  //   phone: "",
  //   shippingMethod: "standard",
  //   saveInfo: false,
  //   emailOffers: false,
  //   billingSameAsShipping: true,
  //   cardNumber: "",
  //   cardExpiry: "",
  //   cardCvc: "",
  //   cardName: "",
  //   paymentMethod: "paystack",
  // });

  const [errors, setErrors] = useState({});
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
 

  // Calculate total dynamically
  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return subtotal - subtotal * discount;
  };

  // Calculate shipping cost
  const getShippingCost = () => {
    switch (formData.shippingMethod) {
      case "standard":
        return 3000;
      case "express":
        return 5000;
      case "one-day":
        return 7500;
      default:
        return 0;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      toast.error("Please enter a discount code.");
      return;
    }

    if (discountCode.trim().toUpperCase() === "SAVE10") {
      setDiscount(0.1); // 10% discount
      toast.success("10% discount applied!");
    } else {
      setDiscount(0); // reset discount if invalid
      toast.error("Invalid discount code.");
    }
  };

  // Validation function for required fields
  const validate = () => {
    let tempErrors = {};

    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
      tempErrors.email = "Invalid email address";

    if (!formData.country) tempErrors.country = "Country is required";
    if (!formData.firstName) tempErrors.firstName = "First name is required";
    if (!formData.lastName) tempErrors.lastName = "Last name is required";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.state) tempErrors.state = "State is required";
    if (!formData.postalCode) tempErrors.postalCode = "Postal code is required";
    if (!formData.phone) tempErrors.phone = "Phone number is required";

    if (!formData.paymentMethod)
      tempErrors.paymentMethod = "Please select a payment method";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Form Data Submitted:", formData);
    toast.success("Order Placed! Proceeding to payment...");
    // Redirect to payment page - dispatch an action or call your payment API
  };

  const initiatePayment = async (cartItems, customer, totalAmount) => {
  try {
    const response = await axios.post('/api/payments/initiate', {
      customer,
      items: cartItems,
      totalAmount,
      paymentMethod: "Paystack",
    });

    window.location.href = response.data.url; // redirect to Paystack payment page
  } catch (err) {
    console.error("Payment error", err);
  }
};

  return (
    
    <div className="container my-5 pt-5">
      <Row className="justify-content-center">
        {/* Left Column - Form */}
        <Col md={7} className="px-4">
          <Form onSubmit={handleSubmit}>
            {/* Form Structure */}
            <Row className="justify-content-between mb-2">
              <Col className="text-start">
                <h5>Contact</h5>

              </Col>
              {/*THis line of code isnt redirecting properly*/}
              <Col className="text-end">
                <a href="/userAuth" className="text-decoration-underline" style={{ color: "black" }}> Log in </a>
              </Col>
            </Row>
            <CheckOut />
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
                <option value="" disabled>
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
                onChange={handleChange} />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city} />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  isInvalid={!!errors.state} >
                  <option value="" disabled>
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
                  onChange={handleChange} />
              </Col>
            </Row>

            <Form.Group className="mb-4" controlId="phone">
              <Form.Control
                type="text"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone} />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <h5 className="mb-3 text-start">Shipping Method</h5>
            
            <div className="mb-4">
              {["standard", "oneDay", "express"].map((method, idx, arr) => {
                const labelMap = {
                  standard: { 
                    label: "Standard Shipping (3-5 business days)", 
                    price: "₦3,000",
                  },
                  oneDay: {
                    label: "One-Day Shipping (1 business day)", 
                    price: "₦5,000",
                  },
                  express: {
                    label: "Express Shipping (2-3 business days)", 
                    price: "₦7,500",
                  },
                };
                
                const isSelected = formData.shippingMethod === method;
                const borderRadiusClass =
                idx === 0
                ? "rounded-top"
                : idx === arr.length - 1
                ? "rounded-bottom"
                : "rounded-0";
                
                return (
                <div key={method}
                className={`border ${borderRadiusClass} ${
                  isSelected ? "border-primary bg-light-blue" : ""}`}
                  onClick={() => setFormData({ ...formData, shippingMethod: method })}
                  style={{ padding: "0.8rem", cursor: "pointer", borderTop: idx === 0 ? "1px solid #dee2e6" : "none",}}>
                  <Form.Group className="m-0">
                    <div className="d-flex justify-content-between align-items-start small">
                      <Form.Check
                      type="radio"
                      label={labelMap[method].label}
                      name="shippingMethod"
                      checked={isSelected}
                      onChange={() =>
                        setFormData({ ...formData,
                          shippingMethod: method })} />
                      <span className="text-end fw-semibold">{labelMap[method].price}</span>
                    </div>
                  </Form.Group>
                </div>
                );
              })}
            </div>
            
            <h5 className="text-start mb-3">Payment Method</h5>
            <p className="text-muted text-start small mb-3">
              All transactions are <strong>secured</strong> and{" "}
              <strong>encrypted</strong>.
            </p>

            <div className="mb-4">
              <div
                className="border rounded-top px-3 border-primary"
                style={{ backgroundColor: "#F0F5FF", padding: "15px 0 15px 0" }} >
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 small">Paystack</p>
                  <div className="d-flex gap-2">
                    {[image3, image4, image1, image2, image6].map(
                      (img, index) => (
                        <span
                          key={index}
                          className="d-inline-flex align-items-center justify-content-center">
                          <img src={img} alt={`Card ${index}`} height="23" />
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div
                className="border rounded-bottom pb-3 pt-2 px-3"
                style={{ backgroundColor: "#F4F4F4" }}>
                <div className="text-center">
                  <img src={image5} alt="Paystack Illustration" width={80} />
                  <p className="mt-2 mb-0 small">
                    After clicking “Pay now”, you will be redirected to <br />
                    Paystack to complete your purchase securely.
                  </p>
                </div>
              </div>
            </div>

            <h5 className="text-start mb-3">Billing Address</h5>
            <div className="mb-3">
              <div className={`border ${formData.billingSameAsShipping ? "rounded-top border-primary bg-light-blue" : "rounded-top"}`}
              onClick={() => setFormData({ ...formData, billingSameAsShipping: true })}
              style={{ cursor: "pointer", padding: "0.8rem" }}>
                <Form.Group className="text-start small">
                  <Form.Check
                    type="radio"
                    label="Same as shipping address"
                    name="billingSameAsShipping"
                    checked={formData.billingSameAsShipping === true}
                    onChange={(e) =>
                      setFormData({ ...formData, billingSameAsShipping: true })
                    }/>
                </Form.Group>
              </div>
              <div className={`border ${formData.billingSameAsShipping ? "rounded-bottom" : "rounded-0 border-primary bg-light-blue"}`} 
              onClick={() => setFormData({ ...formData, billingSameAsShipping: false })}
              style={{ cursor: "pointer", padding: "0.8rem" }}>
                <Form.Group className="text-start small">
                  <Form.Check
                    type="radio"
                    label="Use a different billing address"
                    name="billingSameAsShipping"
                    checked={formData.billingSameAsShipping === false}
                    onChange={(e) =>
                      setFormData({ ...formData, billingSameAsShipping: false })
                    } />
                </Form.Group>
              </div>
              {!formData.billingSameAsShipping && (
                <div className="border rounded-bottom p-3 mb-4 border-top-0"
                style={{ backgroundColor: "#F4F4F4" }}>
                  <Form.Group className="mb-3" controlId="country">
                    <Form.Select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      isInvalid={!!errors.country}>
                      <option value="" disabled>
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
                        isInvalid={!!errors.firstName}/>
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
                        isInvalid={!!errors.lastName}/>
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
                      isInvalid={!!errors.address}/>
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
                      onChange={handleChange}/>
                  </Form.Group>

                  <Row className="mb-3">
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        isInvalid={!!errors.city}/>
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        isInvalid={!!errors.state}>
                        <option value="" disabled>
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
                        onChange={handleChange}/>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4" controlId="phone">
                    <Form.Control
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}/>
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              )}
            </div>

            <div className="d-none d-md-block mt-5">
              <Button
                type="submit"
                className="btn btn-dark bg-black rounded-0 w-100 p-2 mb-4">
                Pay Now
              </Button>
            </div>
          </Form>
        </Col>

        {/* Right Column - Order Summary */}
        <Col md={5} style={{ backgroundColor: window.innerWidth >= 768 ? "#F5F5F5" : "transparent", position: window.innerWidth >= 768 ? "sticky" : "static",
    top: window.innerWidth >= 768 ? "70px" : "auto",
    height: window.innerWidth >= 768 ? "calc(100vh - 70px)" : "auto",
    overflowY: window.innerWidth >= 768 ? "auto" : "visible",}}>
          <div className="d-block d-md-none mt-4 px-4">
            <h5 className="fw-bold text-start">Order Summary</h5>
          </div>
          {/* Order details Structure */}
          {cartItems.map((product) => (
            <Row key={product.id} className="align-items-center my-5 px-4 text-start">
              <Col xs={3}>
                <div style={{ position: "relative", width: "70px", height: "70px",}}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={70}
                    height={70}
                    className="mt-2"
                    style={{ objectFit: "cover", borderRadius: "0.25rem" }}
                    loading="lazy"/>
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
                    }} >
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

          <Form className="my-4 px-4">
            <Row className="gx-2">
              <Col xs={9}>
                <Form.Control
                  type="text"
                  placeholder="Discount code or gift card"
                  className="rounded-0 p-2"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}/>
              </Col>
              <Col xs={3}>
                <Button
                  variant="dark"
                  className="w-100 rounded-0 p-2"
                  onClick={handleApplyDiscount}>
                  Apply
                </Button>
              </Col>
            </Row>
          </Form>

          <Row className="mb-2 px-4">
            <Col className="text-start fw-semibold">Subtotal</Col>
            <Col className="text-end">₦{calculateTotal().toLocaleString()}</Col>
          </Row>

          <Row className="mb-2 px-4">
            <Col className="text-start fw-semibold">Shipping</Col>
            <Col className="text-end">
              {formData.shippingMethod === "standard" && "₦3000 "}
              {formData.shippingMethod === "oneDay" && "₦5,000"}
              {formData.shippingMethod === "express" && "₦7,500"}
            </Col>
          </Row>

          <Row className="mb-2 px-4">
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
        {isAuthenticated && user ? (
        <>
        <div className="d-block d-md-none mt-3 px-4">
          <Button
            type="submit"
            className="btn btn-dark bg-black rounded-0 w-100 p-3"
            onClick={() => dispatch(Checkout())}>
            Pay Now
          </Button>
        </div>
        </>
         ) : (
            <p>Please log in to proceed.</p>
          )}
      </Row>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick />
    </div>
  );
};

export default Checkout;
