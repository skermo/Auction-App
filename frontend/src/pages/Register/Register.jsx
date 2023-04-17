import { ErrorMessage, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as yup from "yup";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import useAuth from "../../hooks/useAuth";
import { LOGIN } from "../../routes";
import { registerUser } from "../../services/userService";
import { removeFromSession, removeFromStorage } from "../../utils/JwtSession";
import "./register.scss";

const Register = () => {
  const [errMsg, setErrMsg] = useState("");

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    removeFromSession();
    removeFromStorage();
  }, []);

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
      const data = await registerUser(user);
      setAuth(data);
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
            <span className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</span>
            <Button text="REGISTER" type="primary" className="btn-full-width" />
          </Form>
        </Formik>
        <p>
          Already have an account?
          <a
            onClick={() => {
              navigate(LOGIN);
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
