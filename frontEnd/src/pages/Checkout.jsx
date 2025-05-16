import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image, Badge } from "react-bootstrap";
import image1 from "../assets/American_Express.png";
import image2 from "../assets/Diners_Club.png";
import image3 from "../assets/mastercard.png";
import image4 from "../assets/Visa.png";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    apartment: "",
  });

  const [promoCode, setPromoCode] = useState("");
  const [shippingMethod, setShippingMethod] = useState(""); 
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Black T-Shirt", price: 5000, quantity: 2, image: "/shirt.jpg" },
    { id: 2, name: "Blue Jeans", price: 12000, quantity: 1, image: "/jeans.jpg" },
    { id: 3, name: "Skirt", price: 3000, quantity: 3, image: "/skirt.jpg" },
  ]);

  // Shipping cost management
  const shippingOptions = {
    standard: 1000,
    express: 3000,
    "one-day": 2000,
  }

  const getShippingCost = (method) => shippingOptions[method] || 0;

  // Calculate total dynamically
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (e) => {
    setShippingMethod(e.target.value);
  };

  const handlePromoCodeApply = () => {
    const validPromoCodes = ["PromoCode1", "PromoCode2", "PromoCode3"];

    if (validPromoCodes.includes(promoCode.toUpperCase())) {
      alert("Promo code applied successfully!");
      // Apply a 10% discount to all items
      setCartItems((prevItems) => 
        prevItems.map((item) => ({ 
          ...item, 
          price: item.price * 0.9,
        }))
      );
    } else {
      alert("Invalid promo code!");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page reload
  
    // You can use a condition to make sure all required fields are valid:
    if (!isFormValid()) {
      alert("Please fill all the required fields correctly.");
      return;
    }
  
    // Send the data to an API
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          promoCode,
          shippingMethod,
          cartItems,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Order successfully placed", result);
        alert("Order placed successfully!");
        // Redirect to a confirmation page or show a confirmation message
      } else {
        console.log("Error placing order");
        alert("There was an error placing your order. Please try again.");
      }
    } catch (error) {
      console.log("API Error:", error);
      alert("Error connecting to the server. Please try again.");
    }
  };
  

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.address &&
      formData.phone &&
      formData.city &&
      formData.state &&
      formData.zip &&
      formData.country &&
      shippingMethod
    )
  }

  return (
    <Container style={{ marginTop: "100px", marginBottom: "100px", paddingTop: "20px" }}>
      <Row className="justify-content-center">
        {/* Left Column - Form */}
        <Col sm={12} md={7} className="px-4">
          <Row className="justify-content-between mb-2">
            <Col className="text-start"><h5>Contact</h5></Col>
            <Col className="text-end"><a href="/login" className="text-decoration-underline" style={{ color: "black" }}>Log in</a></Col>
          </Row>

          {/* Email and News Subscription */}
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              isInvalid={formData.email && !/\S+@\S+\.\S+/.test(formData.email)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check type="checkbox" label="Email me with news & offers" className="text-start" />
          </Form.Group>

          {/* Delivery Information */}
          <h5 className="mb-3 text-start">Delivery</h5>
          <Form.Group className="mb-3">
            <Form.Select name="country" value={formData.country} onChange={handleChange}>
              <option value="" disabled>Country/Region</option>
              <option value="NG">Nigeria</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="CA">Canada</option>
            </Form.Select>
          </Form.Group>

          <Row className="mb-3">
            <Col sm={12} md={6} className="buttom">
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Col>
            <Col sm={12} md={6}>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col sm={12} md={6} className="buttom mb-3">
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Col>
            <Col sm={12} md={6} className="buttom mb-3">
              <Form.Select name="state" value={formData.state} onChange={handleChange}>
                <option value="" disabled>State</option>
                <option value="Lagos">Lagos</option>
                <option value="Kano">Kano</option>
                <option value="Abuja">Abuja</option>
                <option value="Imo">Imo</option>
              </Form.Select>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Postal Code (optional)"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Validate phone number with optional country code */} 
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Phone (including country code)"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              isInvalid={formData.phone && !/^\+?\d{1,4}?\s?\(?\d+\)?[\d\s-]+$/.test(formData.phone)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid 10-digit phone number.
            </Form.Control.Feedback>
          </Form.Group>

          <h5 className="mb-3 text-start">Shipping Method</h5>

          <Form.Group className="mb-3">
            <Form.Check
              type="radio"
              label="Standard Shipping (3-5 business days)"
              value="standard"
              checked={shippingMethod === "standard"}
              onChange={handleShippingChange}
              className="text-start"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="radio"
              label="One-Day Shipping (1 business day)"
              value="one-day"
              checked={shippingMethod === "one-day"}
              onChange={handleShippingChange}
              className="text-start"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="radio"
              label="Express Shipping (2-3 business days)"
              value="express"
              checked={shippingMethod === "express"}
              onChange={handleShippingChange}
              className="text-start"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check type="checkbox" label="Save this information for next time" className="text-start" />
          </Form.Group>

          <h5 className="mb-3 text-start">Payment</h5>
          <p className="text-start mb-3" style={{ fontSize: "14px", color: "#6c757d" }}>
            All transactions are secured & encrypted
          </p>

          {/* Payment Method */}
          <div className="border p-4 rounded mb-4 " style={{ backgroundColor: "#f0f0f0" }}>
            <Row className="mb-3">
              <Col xs={6} md={6}>
                <h6 className="text-start fw-bold fs-4 mt-3">Credit Card</h6>
              </Col>
              <Col xs={6} md={6} className="text-end mt-2">
              <div className="d-flex justify-content-end gap-3">
                <Image src={image1} alt="Credit Card"  style={{ width: "40px" }} />
                <Image src={image2} alt="Credit Card" style={{ width: "40px" }} />
                <Image src={image3} alt="Credit Card" style={{ width: "40px" }} />
                <Image src={image4} alt="Credit Card" style={{ width: "40px"}} />
              </div>
              </Col>
            </Row>

            {/* Card Details */}
            <Form.Group className="mb-3">
              <Form.Control 
                type="text" 
                placeholder="Card Number"
                style={{ padding: "12px", fontSize: "16px" }}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col sm={12} md={6} className="buttom">
              <Form.Group>
                <Form.Control 
                  type="text"
                  placeholder="Expiration Date (MM/YY)"
                  style={{ padding: "12px", fontSize: "16px", width: "100%" }}
                />
              </Form.Group>
              </Col>

              <Col sm={12} md={6}>
              <Form.Group>
                <Form.Control 
                  type="text"
                  placeholder="Security Code"
                  style={{ padding: "12px", fontSize: "16px", width: "100%" }}
                />
              </Form.Group>
                
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Control 
                type="text"
                placeholder="Name on Card"
                style={{ padding: "12px", fontSize: "16px" }}
              />
            </Form.Group>

            <Form.Group className="mb-4 text-start">
              <Form.Check 
                type="checkbox"
                label="Use shipping address as billing address"
                style={{ fontSize: "14px" }}
              />
            </Form.Group>
          </div>

          <Button 
            variant="dark"
            type="submit"
            disabled={!isFormValid()}
            onClick={handleSubmit}
            className="p-3 w-100"
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "0px",
            }}
          >
            Pay Now
          </Button>
        </Col>

        {/* Right Column - Order Summary */}
        <Col sm={12} md={5} className="px-4 mt-4" style={{ backgroundColor: "#f0f0f0" }}>
          {/* Order details Structure */}
          <h5 className="text-start my-4 fs-4">Order Summary</h5>

          {/* Cart Items */}
          {cartItems.map(item => (
            <Row className="align-items-center px-3 my-3 text-start" key={item.id}>
              <Col>
                <div className="position-relative ">
                  <Image src={image1} alt="Product" style={{ width: "80px" }} />
                  {/* Quantity Badge */}
                  <Badge pill bg="dark" style={{
                    position: "absolute", top: "-10px", right: "20px", fontSize: "12px"
                  }}>
                    {item.quantity}
                  </Badge>
                </div>
              </Col>

              <Col className="me-5" style={{ marginLeft: "-40px" }}>
                <p className="mb-1">{item.name}</p>
                <small>Size: M</small>
              </Col>

              <Col className="text-end">
                <p>₦{item.price.toLocaleString()}</p>
              </Col>
            </Row>
          ))}

          <Row className="my-3 px-3">
            <Col xs={9}>
              <Form.Control
                type="text"
                placeholder="Discount code or gift card"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="form-control p-3"
              />
            </Col>

            <Col xs={3} className="d-flex justify-content-end">
              <Button variant="dark" onClick={handlePromoCodeApply}>Apply</Button>
            </Col>
          </Row>

          <Row className="my-3 px-3 text-start">
            <Col xs={8}>
              <strong>Subtotal</strong>
            </Col>

            <Col className="text-end">
              <strong>₦{calculateTotal().toLocaleString()}</strong>
            </Col>
          </Row>

          <Row className="my-3 px-3 text-start">
            <Col xs={8}>
              <strong>Shipping</strong>
            </Col>

            <Col className="text-end">
              <strong>₦{getShippingCost(shippingMethod).toLocaleString()}</strong>
            </Col>
          </Row>

          <hr />
          <Row className="my-3 px-3 pb-4 text-start">
            <Col xs={8}>
              <strong>Total</strong>
            </Col>

            <Col className="text-end">
              <strong>₦{(calculateTotal() + (getShippingCost(shippingMethod))).toLocaleString()}</strong>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;