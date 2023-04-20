import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { itemService } from "../../services/itemService";
import Table from "../Table/Table";
import Tabs from "../Tabs/Tabs";

const Seller = ({ id }) => {
  const [activeItems, setActiveItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);

  const { auth } = useAuth();

  useEffect(() => {
    itemService
      .getActiveItemsBySellerId(id, auth?.accessToken)
      .then((res) => setActiveItems(res));
    itemService
      .getSoldItemsBySellerId(id, auth?.accessToken)
      .then((res) => setSoldItems(res));
  }, [id, auth?.accessToken]);

  return (
    <Tabs labels={["Active", "Sold"]} className="quaternary">
      <Table items={activeItems} type="active" />
      <Table items={soldItems} type="sold" />
    </Tabs>
  );
};

export default Seller;
