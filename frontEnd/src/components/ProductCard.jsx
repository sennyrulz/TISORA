import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { addToCart } from "../redux/cartSlice";
import productModel from "../../../backEnd/models//productModel"
import { productsData } from "./Product";




function ProductCard({id, Img1, Img2, productName, desc, features, material, sizes, price, onAddToCart }) {
  const cld = new Cloudinary({ cloud: { cloudName: 'dr1ay8vmn' }});
  const fallbackPublicId = "IMG_4113_2_hgg2ta";
  const publicId1 = Img1?.[0]?.publicId || fallbackPublicId;
  const publicId2 = Img2?.[0]?.publicId || fallbackPublicId;
  const mainImage = cld.image(publicId1);
  const secondImage = cld.image(publicId2);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMainPublicId, setModalMainPublicId] = useState(publicId1);

  const modalRef = useRef(null);
  const modalId = `productModal-${id}`;
  const dispatch = useDispatch();


  useEffect(() => {
    const handleModalClose = () => setSelectedProduct(null);
    const modalElement = modalRef.current;
    modalElement?.addEventListener("hidden.bs.modal", handleModalClose);


  return () => {
      modalElement?.removeEventListener("hidden.bs.modal", handleModalClose);
    };},[]);

  const openModal = () => {
    setSelectedProduct({
      id,
      publicId1,
      publicId2,
      productName,
      desc,
      features,
      material,
      sizes,
      price,
    });
    setModalMainPublicId(publicId1); // Reset to default main image

    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalRef.current);
    modalInstance.show();
  };

  const handleAddToCart = () => {
    const product = {
      id,
      publicId1,
      publicId2,
      productName,
      desc,
      features,
      material,
      sizes,
      price,
    };
    if (onAddToCart) {
      onAddToCart(product); 
    } else {
      dispatch(addToCart(product)); // fallback
      // alert(`✅ Added to Cart: ${product.productName}`);
    }
    const modalInstance = bootstrap.Modal.getInstance(modalRef.current);
    modalInstance?.hide();
  };
// console.log("ProductCard props:", { productName, desc, material, sizes, price });

  return (
    <>
      <div className="singleCard d-flex flex-column justify-content-between pb-4 mb-5 
         border border-1 shadow-sm w-25 fit-content" style={{ minWidth: "360px", minHeight: "300px"}}>

        <p className='d-none'>{id}</p>

        <div className="bg-secondary" style={{ height: "300px" }}>
          <AdvancedImage 
            cldImg={cld.image(publicId1)} 
            style={{ maxHeight: "300px", objectFit: "cover" }}
            alt={selectedProduct?.productName || 'Product image'} />
        </div>

        <div className="text-center">
          <span>
            <h5 className="mt-4 text-size-md">{productName}</h5>
            <p className="fw-medium text-center">{desc || 'No description'}</p>
            <p className="fw-bold text-black">Price: ₦{price ? price.toLocaleString() : '0'}</p>
          </span>
          
          <button className="w-90 bg-white text-black p-2 px-5 border hover:bg-red-800 hover:text-white transition-all duration-300"
            onClick={openModal}>Choose Options
          </button>
        </div>
      </div>

      {/* Modal */}
      <div ref={modalRef} className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedProduct?.productName || "Product Details"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body px-5">
              {selectedProduct && (
                <>
                <div>
                  {/* Main Image */}
                   <AdvancedImage 
                   cldImg={cld.image(modalMainPublicId)}
                    className="w-100 mb-4"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                    alt={selectedProduct?.productName || 'Product image'} />

                  {/* Thumbnail */}
                  <div
                   className="d-flex justify-content-start gap-4"> 

                    <img src={`https://res.cloudinary.com/dr1ay8vmn/image/upload/w_100,h_100,c_fill/${selectedProduct.publicId1}.jpg`}
                    className="w-100 mb-4"
                    style={{ cursor: 'pointer', maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                    alt= "Thumbnail 1" 
                    onClick={() => setModalMainPublicId(selectedProduct.publicId1)}
                    />
                    
                    <img src={`https://res.cloudinary.com/dr1ay8vmn/image/upload/w_100,h_100,c_fill/${selectedProduct.publicId2}.jpg`}
                     style={{ cursor: 'pointer', maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                     alt="Thumbnail 2"
                    onClick={() => setModalMainPublicId(selectedProduct.publicId2)}
                    />
                  </div>
                </div>
                 

                  <h5 className="text-emphasis mb-2 mt-3 text-start">{selectedProduct.productName}</h5>
                  <p className="mb-4 text-start">{selectedProduct.desc}</p>

                  <h5 className="text-emphasis text-start">Material:</h5>
                  <p className="mb-4 text-start">{selectedProduct.material}</p>

                  <h5 className="text-start">Features:</h5>

                  {Array.isArray(selectedProduct.features) && selectedProduct.features.length > 0 ? (
                    <ul className="px-2 mb-4 text-start">
                      {selectedProduct.features?.map((feature, index) =>(
                      <li key={index}>{feature}</li>))}
                    </ul>
                  ) : (
                    <p className="text-muted">No features listed.</p>
                  )}
                  
                  <h5 className="text-start">Size:</h5>
                  <p className="text-start mb-4">{selectedProduct.sizes}</p>

                  <h5 className="text-start">Price:</h5>
                  <p className="text-start">₦{selectedProduct.price.toLocaleString()}</p>
                </>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="w-100 text-white p-2 px-5 hover:border hover:bg-white hover:text-black transition-all duration-300"
                style={{
                  backgroundColor: '#91443f'
                }}
                onClick={handleAddToCart}>Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
