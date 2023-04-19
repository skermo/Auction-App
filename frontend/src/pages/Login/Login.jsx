import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import InputField from "../../components/InputField/InputField";
import useAuth from "../../hooks/useAuth";
import { REGISTER } from "../../routes/routes";
import { loginValidationSchema } from "../../utils/formValidation";
import "./login.scss";

const Login = () => {
  const { setAuth, loginUser } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [errMsg, setErrMsg] = useState("");

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

  return (
    <div className="login">
      <div className="form-container">
        <h3>LOGIN</h3>
        <Formik
          validationSchema={loginValidationSchema}
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
              <Checkbox
                name="rememberMe"
                value={rememberMe}
                onChange={() => {
                  setRememberMe(!rememberMe);
                }}
                className="checkbox-grey-border"
              />
              <label id="rememberMe">Remember me</label>
            </div>
            <span>{errMsg}</span>
            <Button
              text="LOGIN"
              type="primary"
              className="btn-full-width"
              model="submit"
            />
          </Form>
        </Formik>
        <div className="links">
          <p>Don't have an account?</p>
          <div
            onClick={() => {
              navigate(REGISTER);
            }}
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
