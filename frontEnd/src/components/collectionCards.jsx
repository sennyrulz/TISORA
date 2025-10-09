import React from "react";
import { useNavigate } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";

const CollectionCards = ({ title, id, image }) => {
  const navigate = useNavigate();
  const cld = new Cloudinary({ cloud: { cloudName: "dr1ay8vmn" } });

  const fallbackPublicId = "IMG_4113_2_hgg2ta";
  const publicId = image || fallbackPublicId;
  const cldImage = cld.image(publicId);

  return (
    <div
      className="collectionCard bg-white d-flex flex-column justify-content-between pb-4 mb-5 border border-1 shadow-md fit-content"
      style={{
        minWidth: "240px",
        minHeight: "300px",
        cursor: "pointer",
      }}
    >
      <div className="bg-secondary" style={{ height: "300px" }}>
        <AdvancedImage
          cldImg={cldImage}
          style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }}
          alt={title || "Collection image"}
        />
      </div>

      <div className="text-center">
        <h5 className="mt-4 text-size-md">{title}</h5>
        <button
          className="w-90 text-white p-2 px-5 border transition-all duration-300"
          style={{ background: "#853c38" }}
          onClick={() => navigate("/shop")}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default CollectionCards;
