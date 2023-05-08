import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "../../resources/icons";
import Button from "../Button/Button";
import TableRow from "../TableRow/TableRow";
import "./table.scss";

const Table = ({ items, type }) => {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr className="header">
          <th className="width-10">Item</th>
          <th className="width-32">Name</th>
          <th className="width-10">Time left</th>
          {type === "bids" ? (
            <th className="width-12">Your price</th>
          ) : (
            <th className="width-12">Starting price</th>
          )}
          <th className="width-12">No. bids</th>
          <th className="width-12">Highest bid</th>
          <th className="width-12"></th>
        </tr>
      </thead>
      <tbody>
        {items?.length > 0 ? (
          items.map((value, key) => (
            <TableRow item={value} key={value.id} type={type} />
          ))
        ) : (
          <tr>
            <td className="start-selling" colSpan="7">
              <ShoppingCart />
              {type === "active" ? (
                <p>You do not have any scheduled items for sale.</p>
              ) : (
                <>
                  {type === "sold" ? (
                    <p>You have not sold any items.</p>
                  ) : (
                    <p>You have not placed any bids</p>
                  )}
                </>
              )}
              <div>
                {type === "bids" ? (
                  <Button
                    text="START BIDDING"
                    type="secondary"
                    className="text-dark padding-max"
                    onClick={() => {
                      navigate("/shop?name=&category=");
                    }}
                  />
                ) : (
                  <Button
                    text="START SELLING"
                    type="secondary"
                    className="text-dark padding-max"
                  />
                )}
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
