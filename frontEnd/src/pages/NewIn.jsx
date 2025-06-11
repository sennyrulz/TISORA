import React from 'react';
import CollectionCards from '../components/collectionCards';
import { useNavigate } from "react-router-dom";
import { Row } from 'react-bootstrap'; // Assuming you're using React-Bootstrap

const collections = [
  {
    id: "1",
    title: "Season 1",
    image: "image00040_nc6oy7"
  },
  {
    id: "2",
    title: "Season 2 (Coming Soon)",
    image: "depositphotos_734849084-stock-illustration-shirt-discount-line-icon-vector_pppp92"
  },
  // Add more collections as needed
];

const NewIn = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Collections</h1>
      <Row>
        {collections.map((collection) => (
          <div
            key={collection.id}
            style={{ flex: "0 0 auto", scrollSnapAlign: "start", cursor: "pointer" }}
            onClick={() => navigate(`/shop?collection=${collection.title}`)
            }>
            <CollectionCards {...collection} />
          </div>
        ))}
      </Row>
    </>
  );
};

export default NewIn;
