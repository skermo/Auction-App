import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { newItemStepTwoValidationSchema } from "../../utils/formValidation";
import Button from "../Button/Button";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import FormContainer from "../FormContainer/FormContainer";
import InputField from "../InputField/InputField";

const StepTwo = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };

  return (
    <FormContainer>
      <h3>SET PRICES</h3>
      <Formik
        initialValues={props.data}
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
                name="price"
                id="price"
                autoComplete="off"
              />
              <ErrorMessage name="price" component="span" />
            </div>
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
            <Button
              model="button"
              text="BACK"
              vtype="primary"
              onClick={() => props.prev(values)}
            />
            <Button model="submit" text="NEXT" vtype="primary" />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default StepTwo;
