import { ErrorMessage, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as yup from "yup";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import useAuth from "../../hooks/useAuth";
import { REGISTER } from "../../routes";
import { loginUser } from "../../services/userService";
import { removeFromSession, removeFromStorage } from "../../utils/JwtSession";
import "./login.scss";

const Login = () => {
  const { setAuth } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    removeFromSession();
    removeFromStorage();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (user) => {
    try {
      const data = await loginUser(user, rememberMe);
      setAuth(data);
      navigate("/");
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 404) {
        setErrMsg("Wrong email or password");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be valid")
      .max(320, "Email must be less than 320 characters")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  return (
    <div className="login">
      <div className="form-container">
        <h3>LOGIN</h3>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form className="form">
            <label>Email</label>
            <InputField
              id="email"
              name="email"
              placeholder="user@domain.com"
              type="email"
            />
            <ErrorMessage name="email" component="span" />
            <label>Password</label>
            <InputField
              id="password"
              name="password"
              placeholder="********"
              type="password"
            />
            <ErrorMessage name="password" component="span" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="rememberMe"
                onChange={() => {
                  setRememberMe(!rememberMe);
                }}
                value={rememberMe}
              />
              <label id="rememberMe">Remember me</label>
            </div>
            <span className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</span>
            <Button text="LOGIN" type="primary" className="btn-full-width" />
          </Form>
        </Formik>
        <p>
          Don't have an account?
          <a
            onClick={() => {
              navigate(REGISTER);
            }}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;