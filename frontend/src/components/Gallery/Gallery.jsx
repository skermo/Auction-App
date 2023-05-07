import React, { useEffect, useState } from "react";
import { imageService } from "../../services/imageService";
import "./gallery.scss";

const Gallery = ({ id, sellerId }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [images, setImages] = useState([]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    imageService.getImagesByItemId(id).then((res) => {
      setImages(res);
    });
  }, [id]);

  return (
    <div className="gallery">
      <div className="selected-image">
        <img
          src={
            "https://auction-app-atlantbh.s3.eu-central-1.amazonaws.com/" +
            sellerId +
            "/" +
            images[selectedIndex]?.url
          }
          alt="product"
        />
      </div>
      <div className="slideshow">
        {images.map((value, key) => (
          <img
            src={
              "https://auction-app-atlantbh.s3.eu-central-1.amazonaws.com/" +
              sellerId +
              "/" +
              value.url
            }
            key={`img-${key}`}
            onClick={() => handleClick(key)}
            onFocus={() => {
              setSelectedIndex(key);
            }}
            alt="product"
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
