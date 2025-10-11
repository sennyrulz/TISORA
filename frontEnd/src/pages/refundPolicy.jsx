import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const refundPolicy = () => {
  return (
    <Container className="mt-5 p-5">
        <Row>
            <Col md={{ span: 6, offset: 2 }} className="text-start">
                <h1 className="mb-1 pt-md-5 pb-md-3 fw-normal headerHeader" style={{ fontSize: "3rem" }}>REFUND POLICY</h1>
            </Col>
        </Row>
        <Row>
            <Col md={6} className="mx-auto px-3">
                <p className="fs-6 pt-3 pt-md-2 text-start headerCopy" style={{ fontSize: "3rem" }}>We want you to love every Tisora piece. If for any reason you’re not fully satisfied, we accept returns under the following terms:<br></br><br></br>
                </p>
                <p className="fs-6 text-start bodyCopy" style={{marginLeft:-90}}>
                    <b className='fs-4'>Eligibility</b><br></br>
                        •	Items must be returned within 7 days of delivery.<br></br>
                        •	Returned items must be unworn, unwashed, and in original packaging, with all tags intact.<br></br>
                        •	Returns are not accepted on custom, made to order items.
                    <br></br> <br></br> <br></br>
                    
                    <b className='fs-4 text-justify'>How to Initiate a Return</b> <br></br> 
                        Please email contact@tisoraa.com (not sure of what this email will be) with your order number and reason for return. Once approved, you will receive return instructions and the recipient will cover all logistics. <br></br><br></br>
                        Within Lagos: 2business days from the date of delivery<br></br><br></br>
                        Outside Lagos: 3business  days from delivery date.
                        International orders: 5days after delivery date. We are not responsible for lost or stolen packages once marked as delivered.

                        Refunds and Returns are only accepted if incorrect items are sent .

                        If your item arrives damaged or incorrect, please notify us within 48 hours of delivery so we can make it right by you.
                        <br></br><br></br>
                        Within Lagos: 2business days from the date of delivery
                         <br></br><br></br>
                        Outside Lagos: 3business  days from delivery date.
                        International orders: 5days after delivery date.

                        We are not responsible for lost or stolen packages once marked as delivered.

                        Refunds and Returns are only accepted if incorrect items are sent .

                        If your item arrives damaged or incorrect, please notify us within 48 hours of delivery so we can make it right by you. <br></br> <br></br> <br></br>
                        
                    <b className='fs-4 text-justify'>Refunds</b> <br></br>
                        Refunds are processed as store credit or back to the original payment method (excluding shipping fees), within 5–7 working days after the item has been received and inspected. <br></br> <br></br> <br></br>

                    <b className='fs-4 text-justify'>Exchanges</b><br></br>
                        We do not offer direct exchanges. Please return the original item for a refund and place a new order for the desired item. <br></br> <br></br>
                       
                </p>
                    {/* <p className="fs-6">Our aim is to create and curate unique pieces for exceptional people.</p>
                    <p className="fs-6 pt-4">Our vision is simple: “Timeless”</p> */}
            </Col>
        </Row>

        <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
            <Button variant="dark" href="/shop" className='px-5 py-2 bg-black rounded-0'>Shop Now</Button>
            <Button variant="dark" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className='px-5 py-2 bg-black rounded-0'>Instagram</Button>
        </div>
    </Container>
  )
}

export default refundPolicy
