import axios from "axios";
import { BASE_URL } from "../config";
import {
  getTokenFromSession,
  getTokenFromStorage,
  setInSession,
  setInStorage,
} from "../utils/JwtSession";

export const config = () => {
  let token = getTokenFromSession();
  if (token === null) {
    token = getTokenFromStorage();
    if (token === null) {
      return null;
    }
  }
  return {
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "application/json",
    },
  };
};
export const registerUser = async (user) => {
  return (await createRequest())
    .post("/auth/register", user)
    .then((response) => {
      setInSession(response.data.user, response.data.accessToken);
      return response.data;
    });
};

export const loginUser = async (user, rememberMe) => {
  return (await createRequest()).post("/auth/login", user).then((response) => {
    if (!rememberMe) {
      setInSession(response.data.user, response.data.accessToken);
    } else {
      setInStorage(response.data.user, response.data.accessToken);
    }
    return response.data;
  });
};

export const createRequest = async () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
};
