import axios from "axios";

export const BASE_URL = "http://localhost:8080/api";

export const ApiRequest = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const ApiTokenRequest = (token) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
};
