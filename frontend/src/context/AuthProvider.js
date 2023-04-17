import { createContext, useState } from "react";
import { login, register } from "../services/userService";
import { setInBrowser, setInSession } from "../utils/JwtSession";

export const registerUser = async (user) => {
  const data = await register(user);
  setInSession(data.user, data.accessToken);
  return data;
};

export const loginUser = async (user, rememberMe) => {
  const data = await login(user);
  if (!rememberMe) {
    setInSession(data.user, data.accessToken);
  } else {
    setInBrowser(data.user, data.accessToken);
  }
  return data;
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
