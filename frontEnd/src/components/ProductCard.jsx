import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { addToCart } from "../redux/cartSlice";
import { productsData } from "./Product"

const cld = new Cloudinary({ cloud: { cloudName: 'dr1ay8vmn' }});

{productsData.map(product =>(
  <ProductCard key={product.id} {...product}/>
))} 

function ProductCard({id, Img, productName, desc, material, sizes, price }) {
  const fallbackPublicId = "IMG_4113_2_hgg2ta";
  const publicId = Img?.[0]?.publicId || fallbackPublicId;
  const mainImage = cld.image(publicId);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
      publicId,
      productName,
      desc,
      material,
      sizes,
      price,
    });
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalRef.current);
    modalInstance.show();
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct));
      alert(`✅ Added to Cart: ${selectedProduct.productName}`);
      const modalInstance = bootstrap.Modal.getInstance(modalRef.current);
      modalInstance?.hide();
    }
  };
// console.log("ProductCard props:", { productName, desc, material, sizes, price });

  return (
    <>
      <div className="singleCard pb-4 p-3 px-3 border border-1 mx-3 shadow-sm w-100 shadow-lg">
        <p className='d-none'>{id}</p>

        <div className="bg-secondary" style={{ height: "300px" }}>
          <AdvancedImage 
            cldImg={mainImage} 
            className="w-100 h-100 object-cover" />
        </div>

        <div className="text-center">
          
          <h5 className="mt-3">{productName}</h5>
          <p className="fw-bold text-black">{desc || 'No description'}</p>
          <p className="fw-bold text-black">{material || 'No material'}</p>
          <p className="fw-bold text-black">{sizes || 'No sizes'}</p>
          <p className="fw-bold text-black">N{price.toLocaleString() || '0'}</p>

          <button className="w-100 bg-black text-white p-2 px-5 border hover:bg-white hover:text-black transition-all duration-300"
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

            <div className="modal-body">
              {selectedProduct && (
                <>
                  <AdvancedImage
                    cldImg={cld.image(selectedProduct.publicId)}
                    className="w-100"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                    alt={selectedProduct?.productName || 'Product image'}
                  />
                  <h5>{selectedProduct.productName}</h5>
                  <p>Description: {selectedProduct.desc}</p>
                  <p>Material: {selectedProduct.material}</p>
                  <p>Size: {selectedProduct.sizes}</p>
                  <p>Price: ₦{selectedProduct.price.toLocaleString()}</p>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="w-100 bg-black text-white p-2 px-5 border hover:bg-white hover:text-black transition-all duration-300"
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
