import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "../../resources/icons";
import { imageService } from "../../services/imageService";
import { utils } from "../../utils/utils";
import Button from "../Button/Button";
import "./highlighted-product.scss";

const HighlightedProduct = ({ item }) => {
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/items/${item.id}`);
  };

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
        <Button
          text={"BID NOW"}
          type={"secondary"}
          Icon={ArrowRight}
          onClick={onClick}
        />
      </div>
      <div>
        <img
          src={
            "https://auction-app-atlantbh.s3.eu-central-1.amazonaws.com/" +
            item.sellerId +
            "/" +
            images[0]?.url
          }
          alt="item"
        />
      </div>
    </div>
  );
};

export default HighlightedProduct;
