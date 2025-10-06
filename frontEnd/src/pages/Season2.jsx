import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { productsData } from "../../../backEnd/data/Season2.js";
import ProductCard from "../components/ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Season1 = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("low-to-high"); // low-to-high, high-to-low

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const sortedProducts = React.useMemo(() => {
    return [...products].sort((a, b) =>
      sort === "low-to-high" ? a.price - b.price : b.price - a.price
    );
  }, [sort, products]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
    <Container className="mt-5 py-4 px-0 md:px-5 md:pl-5">
        <Row className="text-start px-3 px-md-0" style={{marginLeft:'150px'}}>
            <Col md={6} className="d-flex flex-column">
                <h3 className="fw-medium mt-5 fs-9 fs-md-4">Products</h3>
                    <div
                        className="d-flex align-items-center gap-1"
                        style={{
                        flexWrap: "nowrap",
                        overflowX: "auto",
                        paddingBottom: "4px" }}
                    >

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

        <Row className="shopRow" style={{marginLeft:'150px'}}>
            {sortedProducts.length === 0 ? (
            <Col>
                <p className="text-muted fs-5 text-center w-100">
                Please check back later or try a different search.
                </p>
            </Col>
            ) : (
            currentProducts.map((product) => (
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
            closeOnClick
        />
    </Container>

    {totalPages > 1 && (
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => paginate(currentPage - 1)}
              style={{ color: '#91443f' }} >
                Previous
            </button>
          </li>
          
          {[...Array(totalPages).keys()].map(number => (
          <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                <button 
                className="page-link" 
                onClick={() => paginate(number + 1)}
                style={{ 
                color: currentPage === number + 1 ? 'white' : '#91443f',
                backgroundColor: currentPage === number + 1 ? '#91443f' : 'white'
                }}>
                {number + 1}
              </button>
          </li>
            ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => paginate(currentPage + 1)}
              style={{ color: '#91443f' }}>
                Next
            </button>
          </li>
        </ul>
      </nav>
    )}
    </>
  )};

export default Season1
