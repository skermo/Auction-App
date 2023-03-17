import PropTypes from "prop-types";
import React from "react";
import WhiteNavbar from "../BottomNavbar/BottomNavbar";
import BlackNavbar from "../TopNavbar/TopNavbar";

const Navbar = ({ username }) => {
  return (
    <div>
      <BlackNavbar username={username} />
      <WhiteNavbar username={username} />
    </div>
  );
};

Navbar.propTypes = {
  username: PropTypes.string,
};

export default Navbar;
