import axios from "axios";
import { BASE_URL } from "../config";

export const register = async (user) => {
  return (await ApiRequest()).post("/auth/register", user).then((response) => {
    return response.data;
  });
};

export const login = async (user) => {
  return (await ApiRequest()).post("/auth/login", user).then((response) => {
    return response.data;
  });
};

const ApiRequest = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
};
