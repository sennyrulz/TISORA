import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const contact = () => {
  return (
    <>
      <Container className="mt-5 p-5">
        <Row>
          <Col md={{ span: 6, offset: 2 }} className="text-start">
            <h1
              className="mb-1 pt-md-5 pb-md-3 fw-normal headerHeader"
              style={{ fontSize: "3rem" }}
            >
              CONTACT
            </h1>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mx-auto">
            <div className="fs-6 pt-3 pt-md-2 bodyCopy text-start" style={{ marginLeft: "-90px" }}>
              For any inquiries, please reach out to us:<br /><br />
              <b className="fs-5">Address</b>
              <div>23, oguntolu Street, Elediye bus stop, shomolu, Lagos.</div><br />
              <b className="fs-5">Email</b>
              <div>contact@tisoraa.com</div><br />
              <b className="fs-5">Phone & WhatsApp</b>
              <div>
                +234 808 743 9193 &amp; +1 647 207 1331
              </div>
            </div>
          </Col>
        </Row>
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
          <Button variant="dark" href="/shop" className="px-5 py-2 bg-black rounded-0">
            Shop Now
          </Button>
          <Button
            variant="dark"
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-black rounded-0"
          >
            Instagram
          </Button>
        </div>
      </Container>
    </>
  )
}

export default contact
