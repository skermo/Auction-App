import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
import { paymentService } from "../../services/paymentService";
import { COUNTRY_LIST } from "../../utils/countryList";
import { shippingAndPaymentValidationSchema } from "../../utils/formValidation";
import Button from "../Button/Button";
import CustomSelect from "../CustomSelect/CustomSelect";
import { customStyle3 } from "../CustomSelect/selectStyles";
import FormContainer from "../FormContainer/FormContainer";
import InputField from "../InputField/InputField";
import "./payment.scss";

const Payment = ({ item, isBought }) => {
  const [errMsg, setErrMsg] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [success, setSuccess] = useState(false);

  const { auth } = useAuth();

  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps,
  } = usePaymentInputs();

  const handleSubmit = async (data) => {
    setLoadingPayment(true);
    setErrMsg("");
    try {
      data.expirationMonth = data?.expiryDate.substring(0, 2);
      data.expirationYear = "20" + data?.expiryDate.substring(5, 7);
      data.userId = auth.user.id;
      data.itemId = item.id;
      data.amount = item.highestBid;
      await paymentService.payForItem(auth.accessToken, data);
      toast.success("Payment successful!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      isBought(true);
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Payment Failed");
      }
    }
    setLoadingPayment(false);
  };

  return (
    <div className="payment">
      <ToastContainer />
      <FormContainer className="payment">
        <h3>SHIPPING & PAYMENT</h3>
        <Formik
          initialValues={{
            cardHolderName: "",
            country: "" || auth?.user?.country,
            zip: "" || auth?.user?.zip,
            city: "" || auth?.user?.city,
            address: "" || auth?.user?.address,
            cardNumber: "",
            expiryDate: "",
            cvc: "",
          }}
          validate={() => {
            let errors = {};
            if (meta.erroredInputs.cardNumber) {
              errors.cardNumber = meta.erroredInputs.cardNumber;
            }
            if (meta.erroredInputs.expiryDate) {
              errors.expiryDate = meta.erroredInputs.expiryDate;
            }
            if (meta.erroredInputs.cvc) {
              errors.cvc = meta.erroredInputs.cvc;
            }
            return errors;
          }}
          onSubmit={handleSubmit}
          validationSchema={shippingAndPaymentValidationSchema}
        >
          {({ dirty, isSubmitting, isValid }) => (
            <Form className="form">
              <div className="form-row">
                <div className="form-item full-width">
                  <label>Card Holder Name</label>
                  <InputField
                    autoComplete="off"
                    id="cardHolderName"
                    name="cardHolderName"
                    placeholder="John Doe"
                    type="text"
                  />
                  <ErrorMessage name="cardHolderName" component="span" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-item">
                  <label>Country</label>
                  <Field
                    options={COUNTRY_LIST}
                    component={CustomSelect}
                    name="country"
                    id="country"
                    styles={customStyle3}
                    placeholder=""
                  />
                  <ErrorMessage name="country" component="span" />
                </div>
                <div className="form-item">
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
              </div>
              <div className="form-row">
                <div className="form-item">
                  <label>Address</label>
                  <InputField
                    placeholder="123 Main Street"
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="off"
                  />
                  <ErrorMessage name="address" component="span" />
                </div>
                <div className="form-item">
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
              <div className="form-row">
                <div className="form-item full-width">
                  <label>Card Info</label>
                  <PaymentInputsWrapper {...wrapperProps} className="form-card">
                    <Field name="cardNumber">
                      {({ field }) => (
                        <input
                          {...getCardNumberProps({
                            onBlur: field.onBlur,
                            onChange: field.onChange,
                          })}
                        />
                      )}
                    </Field>
                    <Field name="expiryDate">
                      {({ field }) => (
                        <input
                          {...getExpiryDateProps({
                            onBlur: field.onBlur,
                            onChange: field.onChange,
                          })}
                        />
                      )}
                    </Field>
                    <Field name="cvc">
                      {({ field }) => (
                        <input
                          {...getCVCProps({
                            onBlur: field.onBlur,
                            onChange: field.onChange,
                          })}
                        />
                      )}
                    </Field>
                  </PaymentInputsWrapper>
                </div>
              </div>

              <span>{errMsg}</span>
              {loadingPayment && !success && (
                <Button
                  text="PROCESSING PAYMENT..."
                  type="primary"
                  model="button"
                  className="btn-full-width"
                  disabled={true}
                />
              )}
              {success && (
                <Button
                  text="PAYMENT SUCCESSFUL"
                  type="success"
                  model="button"
                  className="btn-full-width"
                  disabled={true}
                />
              )}
              {!success && !loadingPayment && (
                <Button
                  text="PAY"
                  type="primary"
                  model="submit"
                  className="btn-full-width"
                  disabled={!(isValid && dirty) || isSubmitting}
                />
              )}
            </Form>
          )}
        </Formik>
      </FormContainer>
    </div>
  );
};

export default Payment;
