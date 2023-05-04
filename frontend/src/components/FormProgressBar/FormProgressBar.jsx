import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "./form-progress-bar.scss";

const FormProgressBar = ({ page }) => {
  const stepPercentage = page ? page * 50 : 0;

  return (
    <ProgressBar percent={stepPercentage}>
      <Step>
        {({ accomplished }) => (
          <div className={`indexedStep`}>
            <div
              className={`smaller-circle ${accomplished && "accomplished"}`}
            ></div>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished }) => (
          <div className={`indexedStep`}>
            <div
              className={`smaller-circle ${accomplished && "accomplished"}`}
            ></div>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished }) => (
          <div className={`indexedStep`}>
            <div
              className={`smaller-circle ${accomplished && "accomplished"}`}
            ></div>
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default FormProgressBar;
