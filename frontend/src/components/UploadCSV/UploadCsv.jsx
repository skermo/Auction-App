import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { itemService } from "../../services/itemService";
import Button from "../Button/Button";
import DragNDrop from "../DragNDrop/DragNDrop";
import FormContainer from "../FormContainer/FormContainer";
import "./upload-csv.scss";

const UploadCsv = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (value) => {
    const formData = new FormData();
    value.file.forEach((file) => {
      formData.append("file", file);
    });
    await itemService
      .uploadCsv(auth?.user?.id, auth?.accessToken, formData)
      .then((res) => {
        if (res.length === 0) {
          navigate(`/my-account/${auth.user.id}/seller`, { state: "csv" });
        }
        setErrors(res);
      });
  };

  return (
    <div className="upload-csv-page">
      <FormContainer>
        <h3>Upload CSV</h3>
        <Formik initialValues={{ file: "" }} onSubmit={handleSubmit}>
          <Form className="form">
            <label>Your CSV should have the following headers: </label>
            <div className="headers">
              <ul>
                <li>
                  <strong>name </strong> - text, no longer than 255 characters
                </li>
                <li>
                  <strong>description </strong>- text, no longer than 1000
                  characters
                </li>
                <li>
                  <strong>startPrice </strong> - number, more than 0
                </li>
                <li>
                  <strong>images </strong> - between 3 and 10 photo urls (jpg,
                  png) divided by space
                </li>
                <li>
                  <strong>category </strong>- text, name of existing category
                </li>
                <li>
                  <strong>subcategory </strong> - text, name of existing
                  subcategory
                </li>
                <li>
                  <strong>startDate </strong> - date with timezone
                </li>
                <li>
                  <strong>endDate </strong> - date with timezone
                </li>
              </ul>
            </div>
            <label>Example of a correct CSV: </label>
            <div className="csv-example">
              <table>
                <thead>
                  <tr className="header">
                    <th>name</th>
                    <th>startPrice</th>
                    <th>category</th>
                    <th>subcategory</th>
                    <th>startDate</th>
                    <th>endDate</th>
                    <th>description</th>
                    <th>images</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-row">
                    <td>Example Item 1</td>
                    <td>19.3</td>
                    <td>Fashion</td>
                    <td>Tops</td>
                    <td>2022-12-03T10:15:30+01:00</td>
                    <td>2023-12-03T10:15:30+01:00</td>
                    <td>This is the first example.</td>
                    <td>
                      https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg
                      https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Pure_black_wallpaper.jpg/640px-Pure_black_wallpaper.jpg
                      https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYXKORbjyWogXs1YxQKJhlXSj9sLelF_DIcQ&usqp=CAU
                    </td>
                  </tr>
                  <tr className="table-row">
                    <td>Example Item 2</td>
                    <td>16</td>
                    <td>Jewelry</td>
                    <td>Rings</td>
                    <td>2022-09-12T10:00:00+01:00</td>
                    <td>2023-07-01T22:15:00+01:00</td>
                    <td>This is the second example.</td>
                    <td>
                      https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg
                      https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Pure_black_wallpaper.jpg/640px-Pure_black_wallpaper.jpg
                      https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYXKORbjyWogXs1YxQKJhlXSj9sLelF_DIcQ&usqp=CAU
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {errors.length > 0 && (
              <div className="csv-errors">
                <label className="label-error">
                  Your CSV is invalid. <br /> Please correct the mistakes stated
                  below and then try again:
                </label>
                <ol>
                  {errors.map((value, key) =>
                    value.fieldName === "" ? (
                      <li key={key}>
                        Error in line {value.lineNumber}:{" "}
                        <strong>{value.message}</strong>
                      </li>
                    ) : (
                      <li key={key}>
                        Error in line {value.lineNumber} at field{" "}
                        {value.fieldName}: <strong>{value.message}</strong>
                      </li>
                    )
                  )}
                </ol>
              </div>
            )}
            <Field name="file" id="file" component={DragNDrop} type="csv" />
            <Button
              model="submit"
              text="SUBMIT"
              type="primary"
              className="btn-full-width"
            />
          </Form>
        </Formik>
      </FormContainer>
    </div>
  );
};

export default UploadCsv;
