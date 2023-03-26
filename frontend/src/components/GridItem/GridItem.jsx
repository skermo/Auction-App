import React, { useEffect, useState } from "react";
import { imageService } from "../../services/imageService";
import { utils } from "../../utils/utils";
import "./grid-item.scss";

const GridItem = ({ item }) => {
  const [images, setImages] = useState([]);

  const price = utils.parseNum(item.startPrice);

  useEffect(() => {
    imageService.getImagesByItemId(item.id).then((res) => setImages(res));
  }, [item]);

  return (
    <div className="grid-item">
      <img src={images[0]?.url} />
      <h4>{item.name}</h4>
      <p>
        Starts from <span>${price}</span>
      </p>
    </div>
  );
};

export default GridItem;
