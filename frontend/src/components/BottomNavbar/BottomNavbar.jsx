import React from "react";
import { useNavigate } from "react-router-dom";
import { AppLogo } from "../../resources/icons";
import "./bottom-navbar.scss";

const BottomNavbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="nav-white">
        <AppLogo className="logged-app-logo" />
        <ul className="nav-list">
          <li
            onClick={() => {
              navigate("/");
            }}
          >
            HOME
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BottomNavbar;
