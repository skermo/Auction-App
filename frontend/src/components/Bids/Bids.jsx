import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { itemService } from "../../services/itemService";
import Table from "../Table/Table";

const Bids = ({ id }) => {
  const [bids, setBids] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    itemService
      .getBiddedOnItemsBySellerId(id, auth?.accessToken)
      .then((res) => setBids(res));
  }, [auth?.accessToken, id]);

  return <Table items={bids} type="bids" />;
};

export default Bids;
