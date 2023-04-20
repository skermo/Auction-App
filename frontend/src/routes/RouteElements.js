import { useRoutes } from "react-router-dom";
import Page from "../components/Page/Page";
import AuthLayout from "../layout/AuthLayout";
import ProtectedLayout from "../layout/ProtectedLayout";
import AboutUs from "../pages/AboutUs/AboutUs";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/Login/Login";
import MyAccount from "../pages/MyAccount/MyAccount";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import ProductOverview from "../pages/ProductOverview/ProductOverview";
import Register from "../pages/Register/Register";
import Shop from "../pages/Shop/Shop";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import {
  ABOUT_US,
  LOGIN,
  MY_ACCOUNT,
  PRIVACY_POLICY,
  PRODUCT_OVERVIEW,
  REGISTER,
  SHOP,
  TERMS_AND_CONDITIONS,
} from "./routes";

import React from "react";

const RouteElements = () => {
  const element = useRoutes([
    {
      path: ABOUT_US,
      element: (
        <Page>
          <AboutUs />
        </Page>
      ),
    },
    {
      path: PRIVACY_POLICY,
      element: (
        <Page>
          <PrivacyPolicy />
        </Page>
      ),
    },
    {
      path: TERMS_AND_CONDITIONS,
      element: (
        <Page>
          <TermsAndConditions />
        </Page>
      ),
    },
    {
      path: "/",
      element: (
        <Page>
          <LandingPage />
        </Page>
      ),
    },
    {
      path: PRODUCT_OVERVIEW,
      element: (
        <Page>
          <ProductOverview />
        </Page>
      ),
    },
    {
      path: SHOP,
      element: (
        <Page>
          <Shop />
        </Page>
      ),
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: LOGIN,
          element: (
            <Page hideSearch>
              <Login />
            </Page>
          ),
        },
        {
          path: REGISTER,
          element: (
            <Page hideSearch>
              <Register />
            </Page>
          ),
        },
      ],
    },
    {
      element: <ProtectedLayout requireId />,
      children: [
        {
          path: MY_ACCOUNT,
          element: (
            <Page>
              <MyAccount />
            </Page>
          ),
        },
      ],
    },
    {
      path: "*",
      element: (
        <Page hideBottomNavbar>
          <PageNotFound />
        </Page>
      ),
    },
  ]);

  return <>{element}</>;
};

export default RouteElements;
