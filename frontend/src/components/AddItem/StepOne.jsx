import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { categoryService } from "../../services/categoryService";
import { subcategoryService } from "../../services/subcategoryService";
import { newItemStepOneValidationSchema } from "../../utils/formValidation";
import Button from "../Button/Button";
import CustomSelect from "../CustomSelect/CustomSelect";
import { customStyle1 } from "../CustomSelect/selectStyles";
import FormContainer from "../FormContainer/FormContainer";
import InputField from "../InputField/InputField";
import TextArea from "../TextArea/TextArea";

const StepOne = (props) => {
  const [categories, setCategories] = useState({});
  const [subcategories, setSubcategories] = useState({});

  useEffect(() => {
    categoryService.getAllCategories().then((res) => {
      setCategories(
        res.map((category) => ({
          value: category.id,
          label: category.name,
        }))
      );
    });
    if (props.data.category) {
      fetchSubcategories(props.data.category);
    }
  }, [props.data.category]);

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
    props.next(values);
  };

  return (
    <FormContainer>
      <h3>ADD ITEM</h3>
      <Formik
        initialValues={props.data}
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
                  name="category"
                  id="category"
                  placeholder="Select Category"
                  styles={customStyle1}
                  sendDataToForm={fetchSubcategories}
                />
                <ErrorMessage name="category" component="span" />
              </div>
              <div>
                <Field
                  options={subcategories}
                  component={CustomSelect}
                  name="subcategory"
                  id="subcategory"
                  placeholder="Select Subcategory"
                  styles={customStyle1}
                />
                <ErrorMessage name="subcategory" component="span" />
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
            <Button model="submit" text="NEXT" vtype="primary" />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default StepOne;
