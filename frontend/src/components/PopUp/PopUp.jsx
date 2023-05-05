import React, { useEffect } from "react";
import Button from "../Button/Button";
import "./pop-up.scss";

const PopUp = ({ closePopUp, children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <div className="modal">
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                closePopUp(false);
              }}
            >
              X
            </button>
          </div>
          {children}
          <div className="footer">
            <Button
              text="CANCEL"
              type="tertiary"
              className="text-dark padding-10"
              onClick={() => {
                closePopUp(false);
              }}
            />
            <Button text="CONTINUE" type="primary" className="padding-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
