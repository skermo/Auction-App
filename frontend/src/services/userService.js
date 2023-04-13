import axios from "axios";
import { BASE_URL } from "../config";
import { getToken, setSession } from "../utils/JwtSession";

export const config = () => {
  const token = getToken();
  if (token === null) {
    return null;
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
      setSession(response.data.user, response.data.accessToken);
    });
};

export const loginUser = async (user) => {
  return (await createRequest()).post("/auth/login", user).then((response) => {
    setSession(response.data.user, response.data.accessToken);
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
