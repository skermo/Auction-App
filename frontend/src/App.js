import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.scss";
import Page from "./components/Page/Page";

import { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import useAuth from "./hooks/useAuth";
import AboutUs from "./pages/AboutUs/AboutUs";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import ProductOverview from "./pages/ProductOverview/ProductOverview";
import Register from "./pages/Register/Register";
import Shop from "./pages/Shop/Shop";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import * as routes from "./routes";
import {
  getTokenFromBrowser,
  getTokenFromSession,
  getUserFromBrowser,
  getUserFromSession,
} from "./utils/JwtSession";
import NeedlessAuth from "./utils/NeedlessAuth";

const App = () => {
  const { setAuth } = useAuth();

  useEffect(() => {
    if (getUserFromSession() != null) {
      setAuth({
        user: getUserFromSession(),
        accessToken: getTokenFromSession(),
      });
    } else if (getUserFromBrowser != null) {
      setAuth({
        user: getUserFromBrowser(),
        accessToken: getTokenFromBrowser(),
      });
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path={routes.ABOUT_US}
              exact
              element={
                <Page>
                  <AboutUs />
                </Page>
              }
            />
            <Route
              path={routes.PRIVACY_POLICY}
              exact
              element={
                <Page>
                  <PrivacyPolicy />
                </Page>
              }
            />
            <Route
              path={routes.TERMS_AND_CONDITIONS}
              exact
              element={
                <Page>
                  <TermsAndConditions />
                </Page>
              }
            />
            <Route
              path="/"
              exact
              element={
                <Page>
                  <LandingPage />
                </Page>
              }
            />
            <Route
              path={routes.PRODUCT_OVERVIEW}
              exact
              element={
                <Page>
                  <ProductOverview />
                </Page>
              }
            />
            <Route
              path={routes.SHOP}
              exact
              element={
                <Page>
                  <Shop />
                </Page>
              }
            />
            <Route element={<NeedlessAuth />}>
              <Route
                path={routes.REGISTER}
                exact
                element={
                  <Page hideSearch>
                    <Register />
                  </Page>
                }
              />
              <Route
                path={routes.LOGIN}
                exact
                element={
                  <Page hideSearch>
                    <Login />
                  </Page>
                }
              />
            </Route>
            <Route
              path="*"
              exact
              element={
                <Page hideBottomNavbar>
                  <PageNotFound />
                </Page>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
