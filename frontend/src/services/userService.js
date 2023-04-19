import axios from "axios";
import { BASE_URL } from "../config";

export const register = async (user) => {
  return ApiRequest()
    .post("/auth/register", user)
    .then((response) => {
      return response.data;
    });
};

export const login = async (user) => {
  return ApiRequest()
    .post("/auth/login", user)
    .then((response) => {
      return response.data;
    });
};

export const logout = async (token) => {
  ApiTokenRequest(token).get("/auth/logout");
};

const ApiRequest = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
};

const ApiTokenRequest = (token) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
};
