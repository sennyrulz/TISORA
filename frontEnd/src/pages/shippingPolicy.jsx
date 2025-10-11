import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const shippingPolicy = () => {
  return (
        <Container className="mt-5 p-5">
             <Row>
                <Col md={{ span: 6, offset: 2 }} className="text-start">
                    <h1 className="mb-1 pt-md-5 pb-md-3 fw-normal headerHeader" style={{ fontSize: "3rem" }}>SHIPPING POLICY</h1>
                </Col>
            </Row>
            <Row>
                <Col md={6} className="mx-auto px-3">
                    <p className="fs-6 pt-3 pt-md-2 text-start bodyCopy" style={{marginLeft:-90}}>
                        <b className='fs-5'>Domestic Shipping (Nigeria)</b><br></br>
                        We offer standard and express delivery options across Nigeria via trusted courier services. 
                        <br></br><br></br>

                        <b className='fs-5'>Lagos Orders</b><br></br> 1-2business days. <br></br><br></br>

                        <b className='fs-5'>Interstate orders</b> <br></br>
                        You will receive tracking information once your order is dispatched  and Standard Delivery takes 3–5 business days
                        <br></br><br></br>

                        <b className='fs-5'>International Shipping</b><br></br>
                        We ship worldwide. Delivery timelines vary depending on location, but typically fall within:<br></br>
                            •	Standard International Shipping: 7–14 business days <br></br>
                            •	Express Shipping: 3–5 business days Customs duties or import taxes may apply and are the responsibility of the recipient.
                    </p>
                </Col>
            </Row>

            <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
                <Button variant="dark" href="/shop" className='px-5 py-2 bg-black rounded-0'>Shop Now</Button>
                <Button variant="dark" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className='px-5 py-2 bg-black rounded-0'>Instagram</Button>
            </div>
        </Container>
  )
}

export default shippingPolicy
