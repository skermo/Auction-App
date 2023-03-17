import React from "react";
import { AppLogo } from "../../resources/icons";
import "./bottom-navbar.scss";

const BottomNavbar = () => {
  return (
    <div>
      <div className="nav-white">
        <AppLogo className="logged-app-logo" />
        <ul className="nav-list">
          <li>HOME</li>
        </ul>
      </div>
    </div>
  );
};

export default BottomNavbar;
