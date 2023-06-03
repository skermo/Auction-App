import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddItem from "../../components/AddItem/AddItem";
import Bids from "../../components/Bids/Bids";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Button from "../../components/Button/Button";
import Seller from "../../components/Seller/Seller";
import Tabs from "../../components/Tabs/Tabs";
import UploadCsv from "../../components/UploadCSV/UploadCsv";
import { FileIcon, PlusIcon } from "../../resources/icons";
import coin from "../../resources/icons/coin.svg";
import hamburgerTab from "../../resources/icons/hamburgerTab.svg";
import "./my-account.scss";

const MyAccount = () => {
  const { id } = useParams();
  const { tab } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const tabLabels = ["Seller", "Bids"];

  useEffect(() => {
    for (let i = 0; i < tabLabels.length; i++) {
      if (tabLabels[i].toLowerCase() === tab.toLowerCase()) {
        setTabIndex(i);
      }
    }
  }, [tab]);

  useEffect(() => {
    console.log(location.state);
    if (location.state === "csv") {
      console.log("toast");
    }
  }, [location.state]);

  const tabIcons = [hamburgerTab, coin];
  return (
    <div className="my-account">
      <Breadcrumbs headline={"My Account"} />
      {tab === "add-item" ? (
        <AddItem />
      ) : tab === "upload-csv" ? (
        <UploadCsv />
      ) : (
        <div>
          <div className="upload-buttons">
            <div className="upload-button">
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
            <div className="upload-button">
              <Button
                type="primary"
                Icon={FileIcon}
                className="padding-max"
                onClick={() => {
                  navigate(`/my-account/${id}/upload-csv`);
                }}
              />
            </div>
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
