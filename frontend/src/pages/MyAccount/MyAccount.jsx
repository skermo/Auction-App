import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddItem from "../../components/AddItem/AddItem";
import Bids from "../../components/Bids/Bids";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Button from "../../components/Button/Button";
import Seller from "../../components/Seller/Seller";
import Tabs from "../../components/Tabs/Tabs";
import { PlusIcon } from "../../resources/icons";
import coin from "../../resources/icons/coin.svg";
import hamburgerTab from "../../resources/icons/hamburgerTab.svg";
import "./my-account.scss";

const MyAccount = () => {
  const { id } = useParams();
  const { tab } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  const tabLabels = ["Seller", "Bids"];

  useEffect(() => {
    for (let i = 0; i < tabLabels.length; i++) {
      if (tabLabels[i].toLowerCase() === tab.toLowerCase()) {
        setTabIndex(i);
      }
    }
  }, [tab]);

  const tabIcons = [hamburgerTab, coin];
  return (
    <div className="my-account">
      <Breadcrumbs headline={"My Account"} />
      {tab === "add-item" ? (
        <AddItem />
      ) : (
        <div>
          <div className="add-item-button">
            <Button
              text="ADD ITEM"
              type="primary"
              Icon={PlusIcon}
              className="padding-max"
              onClick={() => {
                navigate(`/my-account/${id}/add-item`);
              }}
            />
          </div>
          <Tabs
            labels={tabLabels}
            Icons={tabIcons}
            className="tertiary"
            selectedTab={tabIndex}
            navigateTo={true}
          >
            <Seller id={id} />
            <Bids id={id} />
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
