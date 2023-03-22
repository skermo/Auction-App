import axios from "axios";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "../../resources/icons";
import Button from "../Button/Button";
import "./highlighted-product.scss";

const HighlightedProduct = ({ item }) => {
  item.startPrice = parseFloat(item.startPrice).toFixed(2);

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (item.id != null) {
      axios
        .get(`http://localhost:8080/api/images/${item.id}`)
        .then((response) => {
          setImages(response.data);
        });
    }
  }, [item]);

  return (
    <div className="highlighted-product">
      <div className="product-content">
        <h2>{item.name}</h2>
        <h3>Starts From ${item.startPrice}</h3>
        <p>{item.description}</p>
        <Button text={"BID NOW"} type={"secondary"} Icon={ArrowRight} />
      </div>
      <div>
        <img src={images[0]?.url} />
      </div>
    </div>
  );
};

export default HighlightedProduct;
