import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_S3_URL } from "../../config";
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
    if (item.id) {
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
        {item.sellerId && (
          <img
            src={`${BASE_S3_URL}/${item.sellerId}/${images[0]?.url}`}
            alt="item"
          />
        )}
      </div>
    </div>
  );
};

export default HighlightedProduct;
