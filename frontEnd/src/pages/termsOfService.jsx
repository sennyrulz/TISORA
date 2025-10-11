import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const termsOfService = () => {
  return (
        <Container className="mt-5 p-5">
             <Row>
                <Col md={{ span: 6, offset: 2 }} className="text-start">
                    <h1 className="mb-1 pt-md-5 pb-md-3 fw-normal headerHeader" style={{ fontSize: "3rem" }}>TERMS OF SERVICE</h1>
                </Col>
            </Row>
            <Row>
                <Col md={6} className="mx-auto px-3">
                    <p className="fs-6 pt-3 pt-md- text-start bodyCopy" style={{marginLeft:-90}}>At Tisora, we take pride in creating Pieces made with intention and that care extends to how your orders are delivered. Processing Time All orders are processed within 1-3 business days. Each item is crafted with attention to detail.
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

export default termsOfService
