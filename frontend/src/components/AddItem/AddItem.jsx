import React, { useState } from "react";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import "./add-item.scss";

const AddItem = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    price: "",
    startDate: "",
    endDate: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    phoneNumber: "",
  });

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      console.log(newData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    <StepOne data={data} next={handleNextStep} />,
    <StepTwo data={data} next={handleNextStep} prev={handlePrevStep} />,
    <StepThree data={data} next={handleNextStep} prev={handlePrevStep} />,
  ];

  return <div className="add-item-page">{steps[currentStep]}</div>;
};

export default AddItem;
