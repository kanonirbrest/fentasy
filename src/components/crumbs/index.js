import { Link, useLoaderData, useLocation } from "react-router-dom";
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";

import { ROUTE_LABELS } from "@/components/layout/config.js";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const data = useLoaderData();
  console.log(data);
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
            {ROUTE_LABELS[name] || name}
          </Typography>
        ) : (
          <Link
            key={routeTo}
            to={routeTo}
            style={{ textDecoration: "none", color: "white" }}
          >
            {ROUTE_LABELS[name]}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
