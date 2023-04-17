import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.scss";
import Page from "./components/Page/Page";

import AboutUs from "./pages/AboutUs/AboutUs";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import MyProfile from "./pages/MyProfile/MyProfile";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import ProductOverview from "./pages/ProductOverview/ProductOverview";
import Register from "./pages/Register/Register";
import Shop from "./pages/Shop/Shop";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import * as routes from "./routes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
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
          <Route
            path={routes.MY_PROFILE}
            exact
            element={
              <Page>
                <MyProfile />
              </Page>
            }
          />
          <Route
            path="*"
            exact
            element={
              <Page hideBottomNavbar>
                <PageNotFound />
              </Page>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
