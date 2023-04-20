import React, { useEffect, useState } from "react";
import { itemService } from "../../services/itemService";
import Table from "../Table/Table";

const Bids = ({ id }) => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    itemService.getBiddedOnItemsBySellerId(id).then((res) => setBids(res));
  }, [id]);

  return <Table items={bids} type="bids" />;
};

export default Bids;
