import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.scss";
import Page from "./components/Page/Page";

import AboutUs from "./pages/aboutUs/AboutUs";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./pages/termsAndConditions/TermsAndConditions";
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
            path="*"
            exact
            element={
              <Page hideTopNavbar>
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
