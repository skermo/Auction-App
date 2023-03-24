import React, { useEffect, useState } from "react";
import { ArrowRight } from "../../resources/icons";
import { imageService } from "../../services/imageService";
import { utils } from "../../utils/utils";
import Button from "../Button/Button";
import "./highlighted-product.scss";

const HighlightedProduct = ({ item }) => {
  const [images, setImages] = useState([]);

  const price = utils.parseNum(item.startPrice);

  useEffect(() => {
    if (item.id != null) {
      imageService.getImagesByItemId(item.id).then((res) => setImages(res));
    }
  }, [item]);

  return (
    <div className="highlighted-product">
      <div className="product-content">
        <h2>{item.name}</h2>
        <h3>Starts From ${price}</h3>
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
