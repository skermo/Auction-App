import React, { useEffect, useRef, useState } from "react";
import { imageService } from "../../services/imageService";
import "./gallery.scss";

const Gallery = ({ id }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [images, setImages] = useState([]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  const imgRefs = useRef({});

  useEffect(() => {
    imageService.getImagesByItemId(id).then((res) => setImages(res));
  }, [id]);

  return (
    <div className="gallery">
      <img src={images[selectedIndex]?.url} className="selected-image" />
      <div className="slideshow">
        {images.map((value, key) => (
          <img
            src={value.url}
            key={`img-${key}`}
            onClick={() => handleClick(key)}
            ref={(element) => (imgRefs.current[key] = element)}
            onFocus={() => {
              setSelectedIndex(key);
            }}
          ></img>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
