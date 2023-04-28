import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
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

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid")
    .max(320, "Email must be less than 320 characters")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const newBidValidationSchema = yup.object().shape({
  amount: yup
    .number()
    .max(100000000000000, "Bid can't be greater than 100000000000000")
    .required(),
});
