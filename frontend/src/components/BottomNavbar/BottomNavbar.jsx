import React from "react";
import { useNavigate } from "react-router-dom";
import { AppLogo } from "../../resources/icons";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import SearchBar from "../SearchBar/SearchBar";
import "./bottom-navbar.scss";

const BottomNavbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="nav-white">
        <AppLogo className="logged-app-logo" onClick={() => navigate("/")} />
        <SearchBar />
        <ul className="nav-list">
          <li
            onClick={() => {
              navigate("/");
            }}
          >
            <Breadcrumbs text="HOME" onClick="/" />
          </li>
          <li>
            <Breadcrumbs text="SHOP" onClick="/shop?name=&category=" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BottomNavbar;
