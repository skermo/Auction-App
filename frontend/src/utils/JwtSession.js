import { decodeToken } from "react-jwt";

export const setInStorage = (user, token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeFromStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getUserFromStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getTokenFromStorage = () => {
  return localStorage.getItem("token") || null;
};

export const setInSession = (user, token) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const removeFromSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};

export const getUserFromSession = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getTokenFromSession = () => {
  return sessionStorage.getItem("token") || null;
};

export const validToken = () => {
  const token = getTokenFromSession();
  if (token === null) {
    return false;
  }
  const exp = decodeToken(token, { complete: true }).payload.exp;
  return Date.now() < exp * 1000;
};
