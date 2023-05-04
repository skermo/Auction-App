import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { categoryService } from "../../services/categoryService";
import { subcategoryService } from "../../services/subcategoryService";
import { newItemStepOneValidationSchema } from "../../utils/formValidation";
import Button from "../Button/Button";
import CustomSelect from "../CustomSelect/CustomSelect";
import { customStyle1 } from "../CustomSelect/selectStyles";
import DragNDrop from "../DragNDrop/DragNDrop";
import FormContainer from "../FormContainer/FormContainer";
import InputField from "../InputField/InputField";
import TextArea from "../TextArea/TextArea";

const StepOne = ({ data, next }) => {
  const [categories, setCategories] = useState({});
  const [subcategories, setSubcategories] = useState({});

  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    categoryService.getAllCategories().then((res) => {
      setCategories(
        res.map((category) => ({
          value: category.id,
          label: category.name,
        }))
      );
    });
    if (data.category) {
      fetchSubcategories(data.category);
    }
  }, [data.category]);

  const fetchSubcategories = async (categoryId) => {
    subcategoryService.getSubcategoriesByCategoryId(categoryId).then((res) => {
      setSubcategories(
        res.map((subcategory) => ({
          value: subcategory.id,
          label: subcategory.name,
        }))
      );
    });
  };

  const handleSubmit = (values) => {
    next(values);
  };

  return (
    <FormContainer>
      <h3>ADD ITEM</h3>
      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={newItemStepOneValidationSchema}
      >
        {({ values, setFieldValue, handleChange }) => (
          <Form className="form">
            <label>What do you sell?</label>
            <InputField
              id="name"
              name="name"
              placeholder="eg. Targeal 7.1 Surround Sound Gaming Headset for PS4"
              type="text"
              autoComplete="off"
            />
            <ErrorMessage name="name" component="span" />
            <div className="dropdowns">
              <div>
                <Field
                  options={categories}
                  component={CustomSelect}
                  name="categoryId"
                  id="categoryId"
                  placeholder="Select Category"
                  styles={customStyle1}
                  sendDataToForm={fetchSubcategories}
                />
                <ErrorMessage name="categoryId" component="span" />
              </div>
              <div>
                <Field
                  options={subcategories}
                  component={CustomSelect}
                  name="subcategoryId"
                  id="subcategoryId"
                  placeholder="Select Subcategory"
                  styles={customStyle1}
                />
                <ErrorMessage name="subcategoryId" component="span" />
              </div>
            </div>
            <label>Description</label>
            <Field
              component={TextArea}
              value={values.description}
              id="description"
              name="description"
            />
            <p>100 words (700 characters)</p>
            <ErrorMessage name="description" component="span" />
            <Field
              name="photos"
              id="photos"
              component={DragNDrop}
              value={values.files}
            />
            <ErrorMessage name="photos" component="span" />
            <div className="buttons">
              <Button
                text="CANCEL"
                model="button"
                type="tertiary"
                className="text-dark"
                onClick={() => navigate(`/my-account/${auth.user.id}/seller`)}
              />
              <Button model="submit" text="NEXT" type="primary" />
            </div>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default StepOne;
