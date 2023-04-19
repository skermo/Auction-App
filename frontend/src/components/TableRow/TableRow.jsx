import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { imageService } from "../../services/imageService";
import { utils } from "../../utils/utils";
import Button from "../Button/Button";
import "./table-row.scss";

const TableRow = ({ item }) => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const price = utils.parseNum(item.startPrice);
  const highestBid = utils.parseNum(item.highestBid);
  const timeLeft = utils.convertDate(item.startDate, item.endDate);

  useEffect(() => {
    imageService.getImagesByItemId(item.id).then((res) => setImages(res));
  }, [item]);

  return (
    <tr className="table-row">
      <td className="width-10">
        <img src={images[0]?.url} alt="item" />
      </td>
      <td className="width-32">
        <div>{item.name}</div>
        <div className="item-id">#{item.id}</div>
      </td>
      <td className="width-10">{timeLeft}</td>
      <td className="width-12">${price}</td>
      <td className="width-12">{item.noBids}</td>
      <td className={classNames("width-12", "highest-bid")}>${highestBid}</td>
      <td className="width-12">
        <Button
          text="BID"
          type="tertiary"
          className="text-dark"
          onClick={() => {
            navigate(`/items/${item.id}`);
          }}
        />
      </td>
    </tr>
  );
};

export default TableRow;
