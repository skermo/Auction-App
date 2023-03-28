import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { imageService } from "../../services/imageService";
import { utils } from "../../utils/utils";
import "./grid-item.scss";

const GridItem = ({ item, className }) => {
  const [images, setImages] = useState([]);

  const price = utils.parseNum(item.startPrice);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/items/${item.id}`);
  };

  useEffect(() => {
    imageService.getImagesByItemId(item.id).then((res) => setImages(res));
  }, [item]);

  return (
    <div className={classNames("grid-item", className)}>
      <div className={classNames("image-container", className)}>
        <img src={images[0]?.url} alt="item" />
        <div className="overlay" onClick={onClick}></div>
      </div>
      <h4>{item.name}</h4>
      <p>
        Starts from <span>${price}</span>
      </p>
    </div>
  );
};

export default GridItem;
