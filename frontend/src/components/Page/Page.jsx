import React, { useEffect } from "react";
import BottomNavbar from "../BottomNavbar/BottomNavbar";
import Footer from "../Footer/Footer";
import TopNavbar from "../TopNavbar/TopNavbar";

const Page = ({ children, hideBottomNavbar = false }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
