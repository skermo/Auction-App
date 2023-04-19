import React from "react";
import { Link, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {
  ABOUT_US,
  PRIVACY_POLICY,
  PRODUCT_OVERVIEW,
  TERMS_AND_CONDITIONS,
} from "../../routes/routes";
import "./breadcrumbs.scss";

const routes = [
  { path: ABOUT_US, breadcrumb: "About Us" },
  { path: TERMS_AND_CONDITIONS, breadcrumb: "Terms and Conditions" },
  { path: PRIVACY_POLICY, breadcrumb: "Privacy Policy" },
  { path: "items", breadcrumb: null },
  { path: PRODUCT_OVERVIEW, breadcrumb: "Product Overview" },
];

const Breadcrumbs = ({ headline }) => {
  const location = useLocation();
  const breadcrumbs = useBreadcrumbs(routes);
  const divider = " / ";

  return (
    <div className="header">
      <div className="header-item-name">{headline}</div>
      <div className="header-navigate">
        <div className="breadcrumbs">
          {breadcrumbs.map(({ match, breadcrumb }, index) => (
            <React.Fragment key={index}>
              <Link
                key={match.url}
                to={match.pathname}
                className={
                  match.pathname === location.pathname
                    ? "breadcrumb-active"
                    : "breadcrumb-not-active"
                }
              >
                {breadcrumb}
              </Link>
              {index !== breadcrumbs.length - 1 && divider}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
