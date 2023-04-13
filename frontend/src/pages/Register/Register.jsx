import { ErrorMessage, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import * as yup from "yup";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { registerUser } from "../../services/userService";
import { removeSession } from "../../utils/JwtSession";
import "./register.scss";

const Register = () => {
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();

  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(2, "First name must have at least 2 characters")
      .max(50, "First name can't be longer than 50 characters")
      .required("First name is required"),
    lastName: yup
      .string()
      .min(2, "Last name must have at least 2 characters")
      .max(50, "Last name can't be longer than 50 characters")
      .required("Last name is required"),
    email: yup
      .string()
      .email("Email must be valid")
      .max(320, "Email must be less than 320 characters")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must have at least 8 characters")
      .max(128, "Password can't be longer than 128 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (user) => {
    try {
      removeSession();
      await registerUser(user);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
    //window.location.reload();
  };
  return (
    <div className="register">
      <div className="form-container">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </p>
        <h3>REGISTER</h3>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form className="form">
            <label>First Name</label> <br />
            <InputField
              id="firstName"
              name="firstName"
              placeholder="John"
              type="text"
            />
            <br />
            <ErrorMessage name="firstName" component="span" />
            <br />
            <label>Last Name</label> <br />
            <InputField
              id="lastName"
              name="lastName"
              placeholder="Doe"
              type="text"
            />
            <br />
            <ErrorMessage name="lastName" component="span" />
            <br />
            <label>Email</label> <br />
            <InputField
              id="email"
              name="email"
              placeholder="user@domain.com"
              type="email"
            />
            <br />
            <ErrorMessage name="email" component="span" />
            <br />
            <label>Password</label> <br />
            <InputField
              id="password"
              name="password"
              placeholder="********"
              type="password"
            />
            <br />
            <ErrorMessage name="password" component="span" />
            <br />
            <Button text="REGISTER" type="primary" className="btn-full-width" />
          </Form>
        </Formik>
        <p>
          Already have an account?<a>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
