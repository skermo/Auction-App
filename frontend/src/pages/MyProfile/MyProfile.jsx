import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Tabs from "../../components/Tabs/Tabs";
import coin from "../../resources/icons/coin.svg";
import hamburgerTab from "../../resources/icons/hamburgerTab.svg";
import "./my-profile.scss";

const MyProfile = () => {
  const tabLabels = ["Seller", "Bids"];
  const tabIcons = [hamburgerTab, coin];
  return (
    <div className="my-profile">
      <Breadcrumbs headline={"My Account"} />
      <Tabs labels={tabLabels} Icons={tabIcons} className="tertiary">
        <Tabs labels={["Active", "Sold"]}>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Name</th>
                <th>Time left</th>
                <th>Your price</th>
                <th>No. bids</th>
                <th>Highest bid</th>
              </tr>
            </thead>
          </table>
          <div></div>
        </Tabs>
        <div></div>
      </Tabs>
    </div>
  );
};

export default MyProfile;
