import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const ShippingForm = ({ formData, errors, handleChange, refs }) => {
    return (
        <>
        <Row className="justify-content-between mb-2">
                      <Col className="text-start">
                        <h5>Contact</h5>
                      </Col>
                      <Col className="text-end">
                        <a href="/login" className="text-decoration-underline" style={{ color: "black" }}> Log in </a>
                      </Col>
                    </Row>
        
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        ref={refs.email}
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
                        ref={refs.country}
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
                          ref={refs.state}
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
        </>
    );
};

export default ShippingForm;