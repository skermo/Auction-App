import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "../../resources/icons";
import { LOGIN, REGISTER } from "../../routes/routes";
import Icon from "../Icon/Icon";
import "./top-navbar.scss";

const TopNavbar = () => {
  const { auth, logoutUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <div className="nav-black">
        <div className="icons">
          <Icon Icon={FacebookIcon} url={"https://www.facebook.com/"} />
          <Icon Icon={InstagramIcon} url={"https://www.instagram.com/"} />
          <Icon Icon={TwitterIcon} url={"https://www.twitter.com/"} />
        </div>
        {auth?.user ? (
          <div className="welcome-text">
            <div>Hi, {auth.user.firstName}</div>
            <span
              onClick={() => {
                logoutUser();
              }}
            >
              Logout
            </span>
          </div>
        ) : (
          <div className="login-registration">
            <span onClick={() => navigate(LOGIN)}>Login</span>or
            <span onClick={() => navigate(REGISTER)}>Register</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNavbar;
