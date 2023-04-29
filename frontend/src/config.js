import axios from "axios";

export const BASE_URL = "http://localhost:8080/api";

const headerConfig = (token, contentType = false) => {
  if (token && contentType) {
    return {
      "Content-type": undefined,
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
