import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "../../resources/icons";
import {
  ABOUT_US,
  PRIVACY_POLICY,
  TERMS_AND_CONDITIONS,
} from "../../routes/routes";
import Icon from "../Icon/Icon";
import "./footer.scss";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <div className="inner-footer">
        <ul title="AUCTION">
          <li
            className="text-select"
            onClick={() => {
              navigate(ABOUT_US);
            }}
          >
            About Us
          </li>
          <li
            className="text-select"
            onClick={() => {
              navigate(TERMS_AND_CONDITIONS);
            }}
          >
            Terms and Conditions
          </li>
          <li
            className="text-select"
            onClick={() => {
              navigate(PRIVACY_POLICY);
            }}
          >
            Privacy and Policy
          </li>
        </ul>
        <ul title="GET IN TOUCH">
          <li>Call us at +123 797-567-2535</li>
          <li>support@auction.com</li>
          <li>
            <Icon Icon={FacebookIcon} url={"https://www.facebook.com/"} />
            <Icon Icon={InstagramIcon} url={"https://www.instagram.com/"} />
            <Icon Icon={TwitterIcon} url={"https://www.twitter.com/"} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
