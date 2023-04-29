import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "./form-progress-bar.scss";

const FormProgressBar = ({ page }) => {
  var stepPercentage;
  if (page === 0) {
    stepPercentage = 0;
  } else if (page === 1) {
    stepPercentage = 50;
  } else if (page === 2) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

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
