import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";

import { ROUTE_LABELS } from "@/components/layout/config.js";
import { BreadCrumbsContext } from "@/contexts/bread-crumbs-context.js";
function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}
const getLabel = (name, data) => {
  if (isNumber(name)) {
    return data;
  }

  return ROUTE_LABELS[name] || name;
};
const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { data } = React.useContext(BreadCrumbsContext);

  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      <Link
        to="/"
        style={{ textDecoration: "none", color: "white", cursor: "pointer" }}
      >
        На главную
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography
            key={routeTo}
            style={{
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            {getLabel(name, data)}
          </Typography>
        ) : (
          <Link
            key={routeTo}
            to={routeTo}
            style={{ textDecoration: "none", color: "white" }}
          >
            {getLabel(name, data)}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
