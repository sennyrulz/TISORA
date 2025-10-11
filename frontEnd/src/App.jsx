import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userAuthSlice.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom'
import Nav from "./components/Nav.jsx";
import NewIn from "./pages/NewIn.jsx";
import Shop from "./pages/Shop.jsx";
import Discover from "./pages/Discover.jsx";
import Search from "./components/Search.jsx";
import User from "./pages/userAuth.jsx";
import Cart from "./components/Cart.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Logo from "./pages/Logo.jsx";
import HeroBanner from "./components/HeroBanner.jsx";
import BrandTopic from "./components/BrandTopic.jsx";
import Footer from "./components/Footer.jsx";
import { productsData } from "./components/Product.js";
import ProductCard from "./components/ProductCard.jsx";
import "./App.css";
import NewsLetterBox from "./components/NewsLetterBox.jsx";
import { Modal, Button, Container } from "react-bootstrap";
import Checkout from "./components/Checkout.jsx";
import { Cloudinary } from "@cloudinary/url-gen/index";
import UserAuth from "./pages/userAuth.jsx";
import DashboardLanding from "./pages/DashboardLanding.jsx";
import EmailVerify from "./pages/emailVerify.jsx"
import OrdersLanding from "./pages/ordersLanding.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx"
import Orders from "./components/Orders.jsx";
import Season1 from "./pages/Season1.jsx"
import Season2 from "./pages/Season2.jsx"
import RefundPolicy from "./pages/refundPolicy.jsx";
import TermsOfService from "./pages/termsOfService.jsx";
import ShippingPolicy from "./pages/shippingPolicy.jsx";
import Contact from "./components/contact.jsx";


const cld = new Cloudinary({ cloud: { cloudName: 'dr1ay8vmn' }});
const fallbackPublicId = "depositphotos_734849084-stock-illustration-shirt-discount-line-icon-vector_pppp92";
const publicId = fallbackPublicId;
const mainImage = cld.image(publicId);

function App() {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);

  useEffect(() => {
  console.log("Cart updated:", cart);
  const fetchUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/current-user`, 
        { credentials: "include"});
      if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data));
      }
    } catch (err) {
      console.log("Not authenticated");
    }
  }; 

  fetchUser();
}, [cart]);

  const navigate = useNavigate();
  const featuredProducts = productsData.slice(0, 5);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

const addToCart = (product) => {
  if (!product) return;
  setCart((prevCart) => {
    const existingProduct = prevCart.find(item => item.id === product.id);
    if (existingProduct) {
      return prevCart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
  setShowModal(false);
};


return (
  <>
    <Nav />
      <Routes>
        <Route path="/"
          element={
            <>
              <Logo />
              <HeroBanner />

                {/* Featured Products Section */}
                <div className="px-4" style={{ margin: "-60px 0 0 0" }}>
                  <h2 className="text-start px-4 mb-4">Featured Products</h2>
                </div>

              <Container>
                {/* Product Scroll */}
                  <div className="cardScroll d-flex px-10 gap-5 mb-5 overflow-auto" 
                    style={{ whiteSpace: "nowrap" }}>   
                    {productsData.slice(1, 7).map((product) => (
                      <div key={product.id} 
                        style={{ flex: "0 0 auto", scrollSnapAlign: "start"}}>
                          <ProductCard 
                            {...product} 
                            onAddToCart={(product) => {
                              setSelectedProduct(product);
                            setShowModal(true);}}/>
                      </div>
                    ))}
                  </div> 
              </Container>
              <BrandTopic />
            </>
        }/>
        <Route path="/newIn" element={<NewIn />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/search" element={<Search />} />
        <Route path="/userAuth" element={<UserAuth />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/:id/verify/:token" element={<EmailVerify/>} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Season1" element={<Season1 />} />
        <Route path="/Season2" element={<Season2 />} />
        <Route path="/refundPolicy" element={<RefundPolicy />} />
        <Route path="/termsOfService" element={<TermsOfService />} />
        <Route path="/shippingPolicy" element={<ShippingPolicy />} />
        <Route path="/contact" element={<Contact />} />
 
        {/* Protected User Dashboard */}
        <Route path="/DashboardLanding" element={<DashboardLanding/>} />
        <Route path="/OrdersLanding" element={<OrdersLanding/>} />
      </Routes>
      <NewsLetterBox />
      <Footer />

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              <img
                src={selectedProduct.Img}
                alt={selectedProduct.name}
                className="w-100 mb-3"
                style={{ objectFit: "cover", maxHeight: "300px" }}
              />
              <p>Price: ₦{selectedProduct.price} || CAD{selectedProduct.price}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
              variant="btn btn-success bg-black text-white p-2 px-5 border w-100 hover:bg-white hover:text-black transition-all duration-300"
              onClick={() => {
                if (selectedProduct) {
                addToCart(selectedProduct);
              }}}> Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  
  );
}

export default App;
