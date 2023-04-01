import React from "react";
import { useNavigate } from "react-router-dom";
import "./breadcrumbs.scss";

const Breadcrumbs = ({ text, onClick, className }) => {
  const navigate = useNavigate();

  return (
    <span
      className={className}
      onClick={() => {
        navigate(onClick);
        navigate(0);
      }}
    >
      {text}
    </span>
  );
};

export default Breadcrumbs;
