import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { itemService } from "../../services/itemService";
import FormProgressBar from "../FormProgressBar/FormProgressBar";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import "./add-item.scss";

const AddItem = () => {
  const { auth } = useAuth();
  const [errMsg, setErrMsg] = useState("");

  const [data, setData] = useState({
    name: "",
    categoryId: "",
    subcategoryId: "",
    description: "",
    photos: "",
    startPrice: "",
    startDate: "",
    endDate: "",
    address: auth.user?.address || "",
    city: auth.user?.city || "",
    zip: auth.user?.zip || "",
    country: auth.user?.country || "",
    phoneNumber: auth.user?.phoneNumber || "",
  });

  const navigate = useNavigate();

  const handleNextStep = async (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      try {
        const formData = new FormData();
        newData.photos.forEach((photo) => {
          formData.append("files", photo);
        });
        const { photos, ...data } = newData;
        const json = JSON.stringify(data);
        const blob = new Blob([json], {
          type: "application/json",
        });
        formData.append("item", blob);
        await itemService.addNewItem(auth.user.id, auth.accessToken, formData);
        navigate(`/my-account/${auth.user.id}/seller`);
      } catch (error) {
        if (!error?.response) {
          setErrMsg("No Server Response");
        } else if (error.response?.status === 400) {
          setErrMsg("Item is invalid");
        } else {
          setErrMsg("Adding Item Failed");
        }
      }

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

  return (
    <div className="add-item-page">
      <FormProgressBar page={currentStep} />
      <span className="error-message">{errMsg}</span>
      {steps[currentStep]}
    </div>
  );
};

export default AddItem;
