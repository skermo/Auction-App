import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { AppLogo } from "../../resources/icons";
import "./page-not-found.scss";

const PageNotFound = () => {
  const navigate = useNavigate();
  const onBtnClick = () => {
    navigate(-1);
  };

  return (
    <div className="page-not-found">
      <AppLogo className="logo" />
      <div className="error">404</div>
      <div className="text">Oops! Looks like the page is Not Found.</div>
      <div>
        <Button
          type="secondary"
          text="GO BACK"
          onClick={onBtnClick}
          className="btn-go-back"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
