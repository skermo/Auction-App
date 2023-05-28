import React, { useEffect, useState } from "react";
import { BASE_S3_URL } from "../../config";
import { imageService } from "../../services/imageService";
import { itemService } from "../../services/itemService";
import { utils } from "../../utils/utils";
import "./dropdown-row.scss";

const DropdownRow = ({ notification, onClick }) => {
  const [item, setItem] = useState();
  const [images, setImages] = useState([]);

  useEffect(() => {
    itemService.getItemById(notification.itemId).then((res) => {
      setItem(res);
      imageService.getImagesByItemId(res.id).then((data) => {
        setImages(data);
      });
    });
  }, [notification]);

  const name = utils.shortenName(item?.name);
  const timeAgo = utils.convertDate(notification.dateTime);

  return (
    <div className="dropdown-row" onClick={onClick}>
      <div className="row">
        {item?.sellerId && item?.id && images.length > 0 && (
          <img
            src={`${BASE_S3_URL}/${item.sellerId}/${images[0]?.url}`}
            alt="item"
          />
        )}
        {notification.type === "OUTBID" ? (
          <div className="text">
            <div className="type line">You have been outbid on:</div>
            <div className="item-name line">{name}</div>
            <div className="link">Bid again</div>
            <div className="time">{timeAgo} ago</div>
          </div>
        ) : (
          <div className="text">
            <div className="type">You have won the auction on:</div>
            <div className="item-name">{name}</div>
            <div className="link">Buy product</div>
            <div className="time">{timeAgo} ago</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownRow;
