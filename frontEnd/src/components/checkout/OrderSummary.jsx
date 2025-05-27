import React from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";

const OrderSummary = ({
  cartItems,
  discountCode,
  setDiscountCode,
  handleApplyDiscount,
  calculateTotal,
  formData,
}) => {
  return (
    <>
      <div className="d-block d-md-none mt-4 px-4">
        <h5 className="fw-bold text-start">Order Summary</h5>
      </div>

      {/* Order details Structure */}
      {cartItems.map((product) => (
        <Row key={product.id} className="align-items-center my-5 px-4 text-start">
          <Col xs={3}>
            <div style={{ position: "relative", width: "70px", height: "70px" }}>
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
            <p className="mb-0">₦{(product.price * product.quantity).toLocaleString()}</p>
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
              onChange={(e) => setDiscountCode(e.target.value)}
            />
          </Col>
          <Col xs={3}>
            <Button variant="dark" className="w-100 rounded-0 p-2" onClick={handleApplyDiscount}>
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

      {/* Mobile-only Pay Button (below Order Summary) */}
      <div className="d-block d-md-none mt-3 px-4">
        <Button type="submit" className="btn btn-dark bg-black rounded-0 w-100 p-3">
          Pay Now
        </Button>
      </div>
    </>
  );
};

export default OrderSummary;
