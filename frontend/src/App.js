import "./App.scss";

import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import RouteElements from "./routes/RouteElements";
import {
  getTokenFromBrowser,
  getTokenFromSession,
  getUserFromBrowser,
  getUserFromSession,
} from "./utils/JwtSession";

const App = () => {
  const { setAuth } = useAuth();

  useEffect(() => {
    if (getUserFromSession() != null) {
      setAuth({
        user: getUserFromSession(),
        accessToken: getTokenFromSession(),
      });
    } else if (getUserFromBrowser() != null) {
      setAuth({
        user: getUserFromBrowser(),
        accessToken: getTokenFromBrowser(),
      });
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <RouteElements />
      </BrowserRouter>
    </div>
  );
};

export default App;
