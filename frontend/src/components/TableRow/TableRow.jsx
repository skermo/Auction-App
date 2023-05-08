import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_S3_URL } from "../../config";
import useAuth from "../../hooks/useAuth";
import { bidService } from "../../services/bidService";
import { imageService } from "../../services/imageService";
import { utils } from "../../utils/utils";
import Button from "../Button/Button";
import "./table-row.scss";

const TableRow = ({ item, type }) => {
  const [images, setImages] = useState([]);
  const [userBid, setUserBid] = useState();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const price = utils.parseNum(item.startPrice);
  const highestBid = utils.parseNum(item.highestBid);
  const timeLeft = utils.convertDate(item.startDate, item.endDate);
  const hasEndDatePassed = utils.hasDatePassed(item.endDate);

  useEffect(() => {
    imageService.getImagesByItemId(item.id).then((res) => setImages(res));
    if (type === "bids") {
      if (Object.keys(auth).length !== 0) {
        bidService.getBidByUserAndItem(item.id, auth?.user?.id).then((res) => {
          setUserBid(utils.parseNum(res.amount));
        });
      }
    }
  }, [auth, item, type]);

  return (
    <tr
      className="table-row"
      onClick={() => {
        navigate(`/items/${item.id}`);
      }}
    >
      <td className="width-10">
        <img
          src={`${BASE_S3_URL}/${item.sellerId}/${images[0]?.url}`}
          alt="item"
        />
      </td>
      <td className="width-32">
        <div>{item.name}</div>
      </td>
      {hasEndDatePassed ? (
        <td className="width-10">Finished</td>
      ) : (
        <td className="width-10">{timeLeft}</td>
      )}
      {type === "bids" ? (
        <td className="width-12">${userBid}</td>
      ) : (
        <td className="width-12">${price}</td>
      )}
      <td className="width-12">{item.noBids}</td>
      <td className={classNames("width-12", "highest-bid")}>${highestBid}</td>
      <td className="width-12">
        {hasEndDatePassed ? (
          item.buyerId === auth?.user.id ? (
            <Button
              text="BOUGHT"
              type="disabled"
              className="btn-full-width cursor-pointer"
              onClick={() => {
                navigate(`/items/${item.id}`);
              }}
            />
          ) : userBid === highestBid ? (
            <Button
              text="PAY"
              type="primary"
              className="btn-full-width"
              onClick={() => {
                navigate(`/items/${item.id}`);
              }}
            />
          ) : (
            <Button
              text="SOLD"
              type="disabled"
              className="btn-full-width cursor-pointer"
              onClick={() => {
                navigate(`/items/${item.id}`);
              }}
            />
          )
        ) : (
          <Button
            text="BID"
            type="tertiary"
            className="text-dark btn-full-width"
            onClick={() => {
              navigate(`/items/${item.id}`);
            }}
          />
        )}
      </td>
    </tr>
  );
};

export default TableRow;
