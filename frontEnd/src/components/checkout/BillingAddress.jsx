import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const BillingAddress = ({ formData, setFormData, handleChange, errors, refs }) => {
  return (
    <>
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
                        }
                      />
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
                        }
                      />
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
                          refs={refs.country}
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
                            ref={refs.firstName}
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
                            ref={refs.lastName}
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
                          ref={refs.address}
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
                            ref={refs.city}
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
                            refs={refs.state}
                            isInvalid={!!errors.state}
                          >
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
                          ref={refs.phone}
                          isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  )}
                </div>
    </>
  );
};

export default BillingAddress;
