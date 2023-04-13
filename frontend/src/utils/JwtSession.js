import { decodeToken } from "react-jwt";

export const setSession = (user, token) => {
  localStorage.setItem("demo-token", token);
  localStorage.setItem("demo-user", JSON.stringify(user));
};

export const removeSession = () => {
  localStorage.removeItem("demo-token");
  localStorage.removeItem("demo-user");
};

export const getUser = () => {
  const user = localStorage.getItem("demo-user");
  return user ? JSON.parse(user) : null;
};

export const getToken = () => {
  return localStorage.getItem("demo-token") || null;
};

export const validToken = () => {
  const token = getToken();
  if (token === null) {
    return false;
  }
  const exp = decodeToken(token, { complete: true }).payload.exp;
  return Date.now() < exp * 1000;
};
