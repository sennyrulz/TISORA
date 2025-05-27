import React from "react";
import { Form } from "react-bootstrap";
import image1 from "../../assets/american_express.C3z4WB9r.svg";
import image2 from "../../assets/mpesa.C3NjGMBV.svg";
import image3 from "../../assets/master.CzeoQWmc.svg";
import image4 from "../../assets/visa.sxIq5Dot.svg";
import image5 from "../../assets/web.png";
import image6 from "../../assets/ozow.BrS1cEol.svg";

const PaymentMethod = ({ formData, setFormData, error }) => {
  const handlePaymentChange = (e) => {
    setFormData({ ...formData, paymentMethod: e.target.value });
  };

  return (
    <>
      <h5 className="text-start">Payment</h5>
      <p className="text-muted text-start small mb-3">
        All transactions are <strong>secured</strong> and{" "}
        <strong>encrypted</strong>.
      </p>

      <div className="mb-4">
        <div
          className="border rounded-top px-3 border-primary"
          style={{ backgroundColor: "#F0F5FF", padding: "15px 0" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <Form.Check
              type="radio"
              id="paystack"
              label="Paystack"
              name="paymentMethod"
              value="paystack"
              checked={formData.paymentMethod === "paystack"}
              onChange={handlePaymentChange}
              isInvalid={!!error}
            />

            <div className="d-flex gap-2">
              {[image3, image4, image1, image2, image6].map((img, index) => (
                <span
                  key={index}
                  className="d-inline-flex align-items-center justify-content-center"
                >
                  <img src={img} alt={`Card ${index}`} height="23" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="border rounded-bottom pb-3 pt-2 px-3"
          style={{ backgroundColor: "#F4F4F4" }}
        >
          <div className="text-center">
            <img src={image5} alt="Paystack Illustration" width={100} />
            <p className="mt-2 mb-0 small">
              After clicking “Pay now”, you will be redirected to <br />
              Paystack to complete your purchase securely.
            </p>
          </div>
        </div>

        {error && (
          <div className="text-danger mt-2 small">{error}</div>
        )}
      </div>
    </>
  );
};

export default PaymentMethod;
