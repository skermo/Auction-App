import { decodeToken } from "react-jwt";

export const setInBrowser = (user, token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeFromBrowser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getUserFromBrowser = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

export const getTokenFromBrowser = () => {
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
  return JSON.parse(sessionStorage.getItem("user")) || null;
};

export const getTokenFromSession = () => {
  return sessionStorage.getItem("token") || null;
};

export const isTokenValid = () => {
  const token = getTokenFromSession();
  if (token === null) {
    return false;
  }
  const exp = decodeToken(token, { complete: true }).payload.exp;
  return Date.now() < exp * 1000;
};
