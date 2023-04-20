import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import useAuth from "../../hooks/useAuth";
import { LOGIN } from "../../routes/routes";
import { registerValidationSchema } from "../../utils/formValidation";
import "./register.scss";

const Register = () => {
  const [errMsg, setErrMsg] = useState("");

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (user) => {
    try {
      await registerUser(user);
      navigate("/");
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };
  return (
    <div className="register">
      <div className="form-container">
        <h3>REGISTER</h3>
        <Formik
          validationSchema={registerValidationSchema}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form className="form">
            <label>First Name</label>
            <InputField
              id="firstName"
              name="firstName"
              placeholder="John"
              type="text"
              autoComplete="off"
            />
            <ErrorMessage name="firstName" component="span" />
            <label>Last Name</label>
            <InputField
              id="lastName"
              name="lastName"
              placeholder="Doe"
              type="text"
              autoComplete="off"
            />
            <ErrorMessage name="lastName" component="span" />
            <label>Email</label>
            <InputField
              id="email"
              name="email"
              placeholder="user@domain.com"
              type="email"
              autoComplete="off"
            />
            <ErrorMessage name="email" component="span" />
            <label>Password</label>
            <InputField
              id="password"
              name="password"
              placeholder="********"
              type="password"
              autoComplete="off"
            />
            <ErrorMessage name="password" component="span" />
            <span>{errMsg}</span>
            <Button
              text="REGISTER"
              type="primary"
              className="btn-full-width"
              model="submit"
            />
          </Form>
        </Formik>
        <div className="links">
          <p>Already have an account?</p>
          <div
            onClick={() => {
              navigate(LOGIN);
            }}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
