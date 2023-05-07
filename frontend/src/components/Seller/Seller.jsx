import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
import { itemService } from "../../services/itemService";
import Table from "../Table/Table";
import Tabs from "../Tabs/Tabs";

const Seller = ({ id }) => {
  const [activeItems, setActiveItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);

  const { auth } = useAuth();
  const { showToast } = useLocation();

  useEffect(() => {
    itemService
      .getActiveItemsBySellerId(id, auth?.accessToken)
      .then((res) => setActiveItems(res));
    itemService
      .getSoldItemsBySellerId(id, auth?.accessToken)
      .then((res) => setSoldItems(res));
    if (showToast) {
      toast.success("Item successfully added!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [id, auth?.accessToken, showToast]);

  return (
    <div>
      <ToastContainer />
      <Tabs labels={["Active", "Sold"]} className="quaternary">
        <Table items={activeItems} type="active" />
        <Table items={soldItems} type="sold" />
      </Tabs>
    </div>
  );
};

export default Seller;
