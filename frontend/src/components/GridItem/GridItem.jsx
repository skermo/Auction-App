import axios from "axios";
import React, { useEffect, useState } from "react";
import "./grid-item.scss";

const GridItem = ({ item }) => {
  item.startPrice = parseFloat(item.startPrice).toFixed(2);

  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/images/${item.id}`)
      .then((response) => {
        setImages(response.data);
      });
  }, [item]);
  return (
    <div className="grid-item">
      <img src={images[0]?.url} />
      <h4>{item.name}</h4>
      <p>
        Starts from <span>${item.startPrice}</span>
      </p>
    </div>
  );
};

export default GridItem;
