import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "../../resources/icons";
import Icon from "../Icon/Icon";
import "./top-navbar.scss";

const TopNavbar = ({ username }) => {
  return (
    <div>
      <div className="nav-black">
        <div className="icons">
          <Icon Icon={FacebookIcon} url={"https://www.facebook.com/"} />
          <Icon Icon={InstagramIcon} url={"https://www.instagram.com/"} />
          <Icon Icon={TwitterIcon} url={"https://www.twitter.com/"} />
        </div>
        {username && <div className="welcome-text">Hi, {username}</div>}
      </div>
    </div>
  );
};

export default TopNavbar;
