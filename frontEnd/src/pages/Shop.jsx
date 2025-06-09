import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { productsData } from "../components/ProductsData";
import ProductCard from "../components/ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Shop = () => {
  const dispatch = useDispatch();
  // const [cart, setCart] = useState([]);
  const [sort, setSort] = useState("low-to-high"); // low-to-high, high-to-low

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.productName} added to cart`);
  };

  const sortedProducts = React.useMemo(() => {
    return [...productsData].sort((a, b) =>
      sort === "low-to-high" ? a.price - b.price : b.price - a.price
    );
  }, [sort, productsData]);

  return (
    <Container className="mt-5 py-4 px-0 md:px-5 md:pl-5">
      <Row className="text-start px-3 px-md-0">
        <Col md={6} className="d-flex flex-column">
          <h3 className="fw-medium mt-5 fs-9 fs-md-4">Products</h3>
          <div
            className="d-flex align-items-center gap-1"
            style={{
              flexWrap: "nowrap",
              overflowX: "auto",
              paddingBottom: "4px" }}>
            <p className="text-muted mb-0 fw-medium fs-6 fs-md-5"
              style={{ flexShrink: 0 }} >
                Sort by:
            </p>
            <Form.Select
              aria-label="Sort products"
              className="mx-1 my-3 my-md-5"
              onChange={(e) => setSort(e.target.value)}
              value={sort}
              style={{
                width: "fit-content",
                minWidth: "80px",
                maxWidth: "170px",
              }}>
              <option value="low-to-high">Price, (Min price)</option>
              <option value="high-to-low">Price, (Max price)</option>
            </Form.Select>
            <p className="text-muted mb-0 fs-6"
              style={{ whiteSpace: "nowrap", minWidth: "80px" }}>
              {sortedProducts.length} products
            </p>
          </div>
        </Col>
      </Row>

      <Row className="gap-4">
        {sortedProducts.length === 0 ? (
          <Col>
            <p className="text-muted fs-5 text-center w-100">
              Please check back later or try a different search.
            </p>
          </Col>
        ) : (
          sortedProducts.map((product) => (
            <Col
              key={product.id}
              lg={3}
              md={4}
              sm={6}
              xs={12}
              className="d-flex align-items-stretch"
              style={{ minWidth: "360px", minHeight: "300px" }}>
              <ProductCard {...product} onAddToCart={handleAddToCart} />
            </Col>
          ))
        )}
      </Row>

      {/* ✅ Ensure ScrollCards receives addToCart */}
      {/* <ScrollCards products={productModel} addToCart={addToCart} /> */}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick/>
    </Container>
  );
};

export default Shop;
