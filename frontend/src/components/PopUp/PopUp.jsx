import classNames from "classnames";
import React, { useEffect } from "react";
import "./pop-up.scss";

const PopUp = ({ closePopUp, children, className }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <div className={classNames("modal", className)}>
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
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
