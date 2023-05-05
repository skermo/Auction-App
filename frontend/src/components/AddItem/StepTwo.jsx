import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { newItemStepTwoValidationSchema } from "../../utils/formValidation";
import Button from "../Button/Button";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import FormContainer from "../FormContainer/FormContainer";
import InputField from "../InputField/InputField";

const StepTwo = ({ data, next, prev }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleSubmit = (values) => {
    next(values);
  };

  return (
    <FormContainer>
      <h3>SET PRICES</h3>
      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={newItemStepTwoValidationSchema}
      >
        {({ values, setFieldValue, handleChange }) => (
          <Form className="form">
            <label>Your Start Price</label>
            <div className="price-input-div">
              <div className="dollar-sign">$</div>
              <InputField
                className="price-input"
                type="number"
                name="startPrice"
                id="startPrice"
                autoComplete="off"
              />
            </div>
            <ErrorMessage name="startPrice" component="span" />
            <div className="input-dates">
              <div>
                <label>Start Date</label>
                <Field
                  component={CustomDatePicker}
                  name="startDate"
                  id="startDate"
                />
                <ErrorMessage name="startDate" component="span" />
              </div>
              <div>
                <label>End Date</label>
                <Field
                  component={CustomDatePicker}
                  name="endDate"
                  id="endDate"
                />
                <ErrorMessage name="endDate" component="span" />
              </div>
            </div>
            <p className="end-time-info">
              The auction will be automatically closed when the end time comes.
              The highest bid will win the auction.
            </p>
            <div className="buttons">
              <Button
                text="CANCEL"
                model="button"
                type="tertiary"
                className="text-dark"
                onClick={() => navigate(`/my-account/${auth.user.id}/seller`)}
              />
              <div className="buttons-right">
                <Button
                  model="button"
                  text="BACK"
                  type="secondary"
                  className="text-dark"
                  onClick={() => prev(values)}
                />
                <Button model="submit" text="NEXT" type="primary" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default StepTwo;
