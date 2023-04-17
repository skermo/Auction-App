import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AppLogo } from "../../resources/icons";
import SearchBar from "../SearchBar/SearchBar";
import "./bottom-navbar.scss";

const BottomNavbar = ({ hideSearch }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <div
        className={classNames("nav-white", {
          "hide-search": hideSearch,
        })}
      >
        <AppLogo className="logged-app-logo" onClick={() => navigate("/")} />
        {!hideSearch && (
          <>
            <SearchBar />
            <ul className="nav-list">
              <li onClick={() => navigate("/")}>HOME</li>
              <li onClick={() => navigate("/shop?name=&category=")}>SHOP</li>
              {auth?.user && (
                <li onClick={() => navigate(`/my-profile/${auth.user.id}`)}>
                  MY ACCOUNT
                </li>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default BottomNavbar;
