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

export const newItemStepOneValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must have at least 2 characters")
    .max(50, "Name can't be longer than 50 characters")
    .required("Name is required"),
  categoryId: yup.string().required("Category is required"),
  subcategoryId: yup
    .string()
    .when("category", {
      is: "",
      then: yup.string("First choose Category"),
    })
    .required("Subcategory is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(2, "Descripton must have at least 2 characters")
    .max(700, "Decription can't be longer than 700 characters"),
  photos: yup
    .array()
    .min(3, "Must upload at least 3 photos")
    .max(10, "Cannot upload more than 10 photos")
    .required("Photos are required"),
});

export const newItemStepTwoValidationSchema = yup.object().shape({
  startPrice: yup
    .number()
    .positive()
    .required("Price is required")
    .max(1_000_000_000_000, "Price can't be greater than 1.000.000.000.000"),
  startDate: yup
    .date()
    .nullable()
    .transform((v) => (v instanceof Date && !isNaN(v) ? v : null))
    .min(new Date(), "Start Date cannot be in the past")
    .required("Start Date is required"),
  endDate: yup
    .date()
    .nullable()
    .transform((v) => (v instanceof Date && !isNaN(v) ? v : null))
    .required("End Date is required")
    .when("startDate", (startDate) => {
      if (startDate instanceof Date) {
        return yup.date().min(startDate, "End Date must be after Start Date");
      }
    }),
});

export const newItemStepThreeValidationSchema = yup.object().shape({
  address: yup
    .string()
    .required("Address is required")
    .min(2, "Address must have at least 2 characters")
    .max(50, "Address can't be longer than 50 characters"),
  city: yup
    .string()
    .required("City is required")
    .min(2, "City must have at least 2 characters")
    .max(50, "City can't be longer than 50 characters"),
  zip: yup
    .string()
    .required("Zip is required")
    .min(5, "Zip must have 5 numbers")
    .max(5, "Zip must have 5 numbers"),
  country: yup.string().required("Country is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .min(5, "Invalid phone number")
    .max(20, "Invalid phone number"),
});
