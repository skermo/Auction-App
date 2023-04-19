import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import Tabs from "../../components/Tabs/Tabs";
import { PlusIcon } from "../../resources/icons";
import coin from "../../resources/icons/coin.svg";
import hamburgerTab from "../../resources/icons/hamburgerTab.svg";
import { itemService } from "../../services/itemService";
import "./my-profile.scss";

const MyProfile = () => {
  const { id } = useParams();

  const [activeItems, setActiveItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    itemService.getActiveItemsBySellerId(id).then((res) => {
      setActiveItems(res);
    });
    itemService.getSoldItemsBySellerId(id).then((res) => setSoldItems(res));
    itemService.getBiddedOnItemsBySellerId(id).then((res) => setBids(res));
  }, [id]);

  const tabLabels = ["Seller", "Bids"];
  const tabIcons = [hamburgerTab, coin];
  return (
    <div className="my-profile">
      <Breadcrumbs headline={"My Account"} />
      <div className="add-item">
        <Button
          text="ADD ITEM"
          type="primary"
          Icon={PlusIcon}
          className="padding-max"
        />
      </div>
      <Tabs labels={tabLabels} Icons={tabIcons} className="tertiary">
        <Tabs labels={["Active", "Sold"]} className="quaternary">
          <Table items={activeItems} type="active" />
          <Table items={soldItems} type="sold" />
        </Tabs>
        <Table items={bids} type="bids" />
      </Tabs>
    </div>
  );
};

export default MyProfile;
