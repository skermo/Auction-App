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
  const [loading, setLoading] = useState(true);

  const registerUser = async (user) => {
    setLoading(true);
    const data = await register(user);
    setInSession(data.user, data.accessToken);
    setAuth(data);
    setLoading(false);
  };

  const loginUser = async (user, rememberMe) => {
    setLoading(true);
    const data = await login(user);
    if (!rememberMe) {
      setInSession(data.user, data.accessToken);
    } else {
      setInBrowser(data.user, data.accessToken);
    }
    setAuth(data);
    setLoading(false);
  };

  const logoutUser = async () => {
    setLoading(true);
    await logout(auth?.accessToken);
    removeFromBrowser();
    removeFromSession();
    setAuth("");
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loginUser,
        registerUser,
        logoutUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
