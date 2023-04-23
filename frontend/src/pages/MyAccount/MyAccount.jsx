import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  const tabLabels = ["Seller", "Bids"];

  useEffect(() => {
    for (let i = 0; i < tabLabels.length; i++) {
      if (tabLabels[i].toLowerCase() === tab.toLowerCase()) {
        setTabIndex(i);
      }
    }
  }, [tab, tabLabels]);

  const tabIcons = [hamburgerTab, coin];
  return (
    <div className="my-account">
      <Breadcrumbs headline={"My Account"} />
      <div className="add-item">
        <Button
          text="ADD ITEM"
          type="primary"
          Icon={PlusIcon}
          className="padding-max"
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
  );
};

export default MyAccount;
