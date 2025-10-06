import React from 'react';
import CollectionCards from '../components/collectionCards';
import { useNavigate } from "react-router-dom";
import { Row } from 'react-bootstrap';

const collections = [
  {
    id: "1",
    title: "Season 1",
    image: "image00040_nc6oy7"
  },
  {
    id: "2",
    title: "Season 2",
    image: "1P5A9543_qk66xe"
  },
];

const NewIn = () => {
  const navigate = useNavigate();

  const handleClick = (collection) => {
    if (collection.title === "Season 1") {
      navigate(`/season1?collection=${collection.title}`);
    } else if (collection.title === "Season 2") {
      navigate(`/season2?collection=${collection.title}`);
    }
  };

  return (
    <>
      <h1>Collections</h1>
      <Row>
        {collections.map((collection) => (
          <div
            key={collection.id}
            style={{ flex: "0 0 auto", scrollSnapAlign: "start", cursor: "pointer" }}
            onClick={() => handleClick(collection)}>
            <CollectionCards {...collection} />
          </div>
        ))}
      </Row>
    </>
  );
};

export default NewIn;
