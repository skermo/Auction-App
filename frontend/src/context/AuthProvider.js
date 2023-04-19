import { createContext, useState } from "react";
import { login, logout, register } from "../services/userService";
import {
  removeFromBrowser,
  removeFromSession,
  setInBrowser,
  setInSession,
} from "../utils/JwtSession";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const registerUser = async (user) => {
    const data = await register(user);
    setInSession(data.user, data.accessToken);
    return data;
  };

  const loginUser = async (user, rememberMe) => {
    const data = await login(user);
    if (!rememberMe) {
      setInSession(data.user, data.accessToken);
    } else {
      setInBrowser(data.user, data.accessToken);
    }
    return data;
  };

  const logoutUser = async () => {
    await logout(auth?.accessToken);
    removeFromBrowser();
    removeFromSession();
    setAuth("");
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, loginUser, registerUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
