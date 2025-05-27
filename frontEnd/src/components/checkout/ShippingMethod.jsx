import React from "react";
import { Form } from "react-bootstrap";

const ShippingMethod = ({ shippingMethod, onChange }) => {
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

  return (
    <>
      <h5 className="mb-3 text-start">Shipping Method</h5>

      <div className="mb-4">
        {["standard", "oneDay", "express"].map((method, idx, arr) => {
          const isSelected = shippingMethod === method;
          const borderRadiusClass =
            idx === 0
              ? "rounded-top"
              : idx === arr.length - 1
              ? "rounded-bottom"
              : "rounded-0";

          return (
            <div
              key={method}
              className={`border ${borderRadiusClass} ${
                isSelected ? "border-primary bg-light-blue" : ""
              }`}
              onClick={() => onChange(method)}
              style={{
                padding: "0.8rem",
                cursor: "pointer",
                borderTop: idx === 0 ? "1px solid #dee2e6" : "none",
              }}
            >
              <Form.Group className="m-0">
                <div className="d-flex justify-content-between align-items-start small">
                  <Form.Check
                    type="radio"
                    label={labelMap[method].label}
                    name="shippingMethod"
                    checked={isSelected}
                    onChange={() => onChange(method)}
                  />
                  <span className="text-end fw-semibold">
                    {labelMap[method].price}
                  </span>
                </div>
              </Form.Group>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShippingMethod;
