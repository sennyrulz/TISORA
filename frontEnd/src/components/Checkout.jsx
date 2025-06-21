import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { loadPaystackScript } from "../utils/paystack";
import { initializePayment, verifyPayment } from "../services/paystackService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShippingForm from "./checkout/ShippingForm";
import BillingAddress from "./checkout/BillingAddress";
import ShippingMethod from "./checkout/ShippingMethod";
import PaymentMethod from "./checkout/PaymentMethod";
import OrderSummary from "./checkout/OrderSummary";
import AuthSidebar from "./AuthSidebar";

const Checkout = () => {
  // Form data state for billing, shipping, and payment
  const [formData, setFormData] = useState({
      email: "",
      country: "NG",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
      shippingMethod: "standard",
      saveInfo: false,
      emailOffers: false,
      billingSameAsShipping: true,
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      cardName: "",
      paymentMethod: "paystack",
    });

    const refs = {
      email: useRef(),
      country: useRef(),
      firstName: useRef(),
      lastName: useRef(),
      address: useRef(),
      city: useRef(),
      state: useRef(),
      phone: useRef(),
    }

    const [errors, setErrors] = useState({});
    const [discountCode, setDiscountCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paystackLoaded, setPaystackLoaded] = useState(false);
    const [showAuthSidebar, setShowAuthSidebar] = useState(false);

  const cartItems = useSelector((state) => state.cart.cart);
  const specialInstructions = useSelector((state) => state.cart.specialInstructions);
  const userState = useSelector((state) => state.user);
  const isAuthenticated = userState?.isAuthenticated;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // or get it from Redux

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      setShowAuthSidebar(true);
      return;
    }

    // Load Paystack script
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setPaystackLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [isAuthenticated]);

  // If not authenticated, show auth sidebar
  if (!isAuthenticated) {
    return (
      <>
        <AuthSidebar 
          isOpen={showAuthSidebar} 
          onClose={() => {
            setShowAuthSidebar(false);
            navigate('/'); // Redirect to home if they close without logging in
          }} 
        />
      </>
    );
  }

   // Calculate total dynamically
  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return subtotal - subtotal * discount;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleApplyDiscount = () => {
      if (!discountCode.trim()) {
        toast.error("Please enter a discount code.");
        return;
      }
  
      if (discountCode.trim().toUpperCase() === "SAVE10") {
        setDiscount(0.1); // 10% discount
        toast.success("10% discount applied!");
      } else {
        setDiscount(0); // reset discount if invalid
        toast.error("Invalid discount code.");
      }
    };

    const validate = () => {
        let tempErrors = {};
        let firstErrorKey = null;

        const addError = (key, message) => {
          tempErrors[key] = message;
          if (!firstErrorKey) firstErrorKey = key;
        };
        
        if (!formData.email)
          addError("email", "Email is required");
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
          addError("email", "Invalid email address");
        
        if (!formData.country) addError("country", "Country is required");
        if (!formData.firstName) addError("firstName", "First name is required");
        if (!formData.lastName) addError("lastName", "Last name is required");
        if (!formData.address) addError("address", "Address is required");
        if (!formData.city) addError("city", "City is required");
        if (!formData.state) addError("state", "State is required");
        if (!formData.postalCode) addError("postalCode", "Postal code is required");
        if (!formData.phone) addError("phone", "Phone number is required");

        if (!formData.paymentMethod)
          addError("paymentMethod", "Please select a payment method");
        
        setErrors(tempErrors);
        return { isValid: Object.keys(tempErrors).length === 0, firstErrorKey };
      };

      const handlePaystackPayment = async () => {
        try {
          setIsProcessing(true);

          const paymentData = {
            email: formData.email,
            amount: calculateTotal() * 100,
            currency: "NGN",
            metadata: {
              customer: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                email: formData.email
              },
              order: {
                items: cartItems.map(item => ({
                  id: item.id,
                  productName: item.productName,
                  quantity: item.quantity,
                  price: item.price
                })),
                shipping: {
                  address: formData.address,
                  city: formData.city,
                  state: formData.state,
                  country: formData.country,
                  zipCode: formData.postalCode
                },
                specialInstructions: specialInstructions
              }
            }
          };

          const response = await initializePayment(paymentData, token);
          if (response.status === true) {
          window.location.href = response.data.authorization_url;
    }
          if (!response.success) {
            throw new Error(response.message || 'Payment initialization failed');
          }

          const handler = window.PaystackPop.setup({
            key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
            email: formData.email,
            amount: paymentData.amount,
            currency: paymentData.currency,
            ref: response.data.reference,
            callback: function(response) {
              verifyPayment(response.reference)
                .then(verificationResult => {
                if (verificationResult.success) {
                  toast.success("Payment successful! Order confirmed.");
                  dispatch(clearCart());
                    navigate("/order-success", {
                      state: {
                        paymentData: {
                          reference: response.reference,
                          amount: paymentData.amount,
                          email: formData.email,
                          customer: paymentData.metadata.customer,
                          order: paymentData.metadata.order
                        }
                      }
                    });
                } else {
                    toast.error(verificationResult.message || "Payment verification failed");
                    dispatch(clearCart()); // 🧹 Clear the cart
                  //Create a redirect page saying thank you(Optional)
                }
                })
                .catch(error => {
                console.error("Payment verification error:", error);
                  toast.error("Payment verification failed. Please contact support.");
                });
            },
            onClose: function() {
              toast.info('Payment cancelled.');
            }
          });

          handler.openIframe();
        } catch (error) {
          console.error("Payment initialization error:", error);
          toast.error(error.message || "Payment initialization failed");
        } finally {
          setIsProcessing(false);
        }
      };

        const handleSubmit = (e) => {
          e.preventDefault();
          
          const { isValid, firstErrorKey } = validate();
          if (!isValid) {
            toast.error(`Please fill in all required fields.`);
            if (firstErrorKey && refs[firstErrorKey]?.current) {
              refs[firstErrorKey].current.scrollIntoView({ behavior: "smooth", block: "center" });
              refs[firstErrorKey].current.focus();
            }
            return;
          }
          // Calling paystackpayment API here
        if (!paystackLoaded) {
          toast.error('Payment system is loading. Please try again in a moment.');
          return;
        }
          handlePaystackPayment();
          setIsProcessing(true);
          console.log("Form Data Submitted:", formData);
          toast.success("Order Placed!");
          
          // setTimeout(() => {
          //   console.log("Form Data Submitted:", formData);
          //   // TODO: Call Paystack or redirect here
          //   // setIsProcessing(false); // Reset processing state if needed
          //   }, 1000);
          };
      
      return (
        <div className="container my-5 pt-5">
          <Row className="justify-content-center">
            {/* Left Column - Billing, Shipping, Payment */}
            <Col md={7} className="px-4">
            <Form onSubmit={handleSubmit}>
              <ShippingForm formData={formData} setFormData={setFormData} handleChange={handleChange} errors={errors} refs={refs} />
              <ShippingMethod
              shippingMethod={formData.shippingMethod}
              onChange={(method) => setFormData({ ...formData, shippingMethod: method })}/>
              <PaymentMethod formData={formData} setFormData={setFormData} handleChange={handleChange} errors={errors} />
              <BillingAddress formData={formData}
              setFormData={setFormData} 
              handleChange={handleChange}
              errors={errors} refs={refs} />

              <div className="d-none d-md-block mt-5">
              <Button
                type="submit"
                className="btn btn-dark bg-black rounded-0 w-100 p-2 mb-4"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Pay Now"}
              </Button>
            </div>
          </Form>
        </Col>

        {/* Right Column - Order Summary */}
        <Col md={5} style={{ backgroundColor: window.innerWidth >= 768 ? "#F5F5F5" : "transparent", position: window.innerWidth >= 768 ? "sticky" : "static",
        top: window.innerWidth >= 768 ? "70px" : "auto",
        height: window.innerWidth >= 768 ? "calc(100vh - 70px)" : "auto",
        overflowY: window.innerWidth >= 768 ? "auto" : "visible",}}>
          <OrderSummary
            cartItems={cartItems}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
            handleApplyDiscount={handleApplyDiscount}
            calculateTotal={calculateTotal}
            formData={formData}
          />
        </Col>
      </Row>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
      />
    </div>
  );
};

export default Checkout;
