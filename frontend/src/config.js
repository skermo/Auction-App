import axios from "axios";

export const BASE_URL = "https://auction-app-backend-mo4f.onrender.com/api";

export const BASE_S3_URL =
  "https://auction-app-atlantbh-semrakermo.s3.eu-north-1.amazonaws.com";

const headerConfig = (token, contentType = false) => {
  if (token && contentType === "undefined") {
    return {
      "Content-type": undefined,
      Authorization: "Bearer " + token,
    };
  } else if (token && contentType === "multipart") {
    return {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + token,
    };
  } else if (token) {
    return {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    };
  } else {
    return { "Content-type": "application/json" };
  }
};

export const ApiRequest = (token, contentType) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: headerConfig(token, contentType),
  });
};
