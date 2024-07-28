import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import { AuthGuard } from "@/components/auth/auth-guard.js";
import { useUser } from "@/hooks/use-user.js";
import Header from "@/layouts/dashboard/header.jsx";
import Main from "@/layouts/dashboard/main.jsx";
import Nav from "@/layouts/dashboard/nav.jsx";
import { ROLE } from "@/utils/constant.js";
import { PATHS } from "@/utils/paths.js";

export function Layout() {
  const [openNav, setOpenNav] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (user?.role && location.pathname === PATHS.home) {
      if (user?.role === ROLE.ADMIN) {
        navigate(PATHS.admin.tournaments);
      } else {
        navigate(PATHS.tournaments);
      }
    }
  }, [user?.role]);

  return (
    <AuthGuard>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>
          <Outlet />
        </Main>
      </Box>
    </AuthGuard>
  );
}
