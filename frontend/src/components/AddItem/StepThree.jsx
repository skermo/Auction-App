import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { COUNTRY_LIST } from "../../utils/countryList";
import { newItemStepThreeValidationSchema } from "../../utils/formValidation";
import Button from "../Button/Button";
import CustomSelect from "../CustomSelect/CustomSelect";
import { customStyle2 } from "../CustomSelect/selectStyles";
import FormContainer from "../FormContainer/FormContainer";
import InputField from "../InputField/InputField";

const StepThree = (props) => {
  const handleSubmit = (values) => {
    props.next(values, true);
  };

  return (
    <FormContainer>
      <h3>LOCATION & SHIPPING</h3>
      <Formik
        initialValues={props.data}
        onSubmit={handleSubmit}
        validationSchema={newItemStepThreeValidationSchema}
      >
        {({ values, setFieldValue, handleChange }) => (
          <Form className="form">
            <label>Address</label>
            <InputField
              placeholder="123 Main Street"
              id="address"
              name="address"
              type="text"
              autoComplete="off"
            />
            <ErrorMessage name="address" component="span" />
            <div className="city-zip">
              <div className="item">
                <label>City</label>
                <InputField
                  id="city"
                  name="city"
                  placeholder="Madrid"
                  type="text"
                  autoComplete="off"
                />
                <ErrorMessage name="city" component="span" />
              </div>
              <div className="item">
                <label>Zip</label>
                <InputField
                  id="zip"
                  name="zip"
                  placeholder="XXXXX"
                  type="text"
                  autoComplete="off"
                />
                <ErrorMessage name="zip" component="span" />
              </div>
            </div>
            <label>Country</label>
            <Field
              options={COUNTRY_LIST}
              component={CustomSelect}
              name="country"
              id="country"
              styles={customStyle2}
              placeholder=""
            />
            <ErrorMessage name="country" component="span" />
            <label>Phone number</label>
            <InputField
              placeholder="+32534231564"
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              autoComplete="off"
            />
            <ErrorMessage name="phoneNumber" component="span" />
            <Button
              text="BACK"
              type="primary"
              model="button"
              onClick={() => props.prev(values)}
            />
            <Button text="SUBMIT" type="primary" model="submit" />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default StepThree;
