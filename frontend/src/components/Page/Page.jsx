import React, { useEffect } from "react";
import BottomNavbar from "../BottomNavbar/BottomNavbar";
import Footer from "../Footer/Footer";
import TopNavbar from "../TopNavbar/TopNavbar";

const Page = ({ children, hideBottomNavbar = false }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [children]);

  return (
    <>
      <TopNavbar />
      {!hideBottomNavbar && <BottomNavbar />}
      {children}
      <Footer />
    </>
  );
};

export default Page;
