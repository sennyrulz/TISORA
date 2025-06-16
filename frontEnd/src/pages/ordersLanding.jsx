import React, { useEffect, useState } from "react";  
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Orders from '../components/Orders.jsx'
import Sidebar from "../components/Sidebar.jsx"


const OrdersLanding = () => {
  return (
    <div>
         <Container style={{ marginTop: "150px", marginBottom: "100px", paddingTop: "20px" }}>
            <Row>
                <Col>
                    <Sidebar />
                    <Orders />
                </Col>
            </Row>
        </Container>
     </div>
    ) 
}

export default OrdersLanding




