import React, { useEffect, useState } from "react";
import { itemService } from "../../services/itemService";
import Table from "../Table/Table";
import Tabs from "../Tabs/Tabs";

const Seller = ({ id }) => {
  const [activeItems, setActiveItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);

  useEffect(() => {
    itemService.getActiveItemsBySellerId(id).then((res) => setActiveItems(res));
    itemService.getSoldItemsBySellerId(id).then((res) => setSoldItems(res));
  }, [id]);

  return (
    <Tabs labels={["Active", "Sold"]} className="quaternary">
      <Table items={activeItems} type="active" />
      <Table items={soldItems} type="sold" />
    </Tabs>
  );
};

export default Seller;
