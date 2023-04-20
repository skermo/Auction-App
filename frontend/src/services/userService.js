import { ApiRequest, ApiTokenRequest } from "../config";

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
