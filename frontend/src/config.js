import axios from "axios";

export const BASE_URL = "http://localhost:8080/api";

const headerConfig = (token) => {
  if (token) {
    return {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    };
  } else {
    return { "Content-type": "application/json" };
  }
};

export const ApiRequest = (token) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: headerConfig(token),
  });
};
