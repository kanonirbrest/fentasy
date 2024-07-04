import { useState } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import { AuthGuard } from "@/components/auth/auth-guard.js";
import Header from "@/layouts/dashboard/header.jsx";
import Main from "@/layouts/dashboard/main.jsx";
import Nav from "@/layouts/dashboard/nav.jsx";

export function Layout() {
  const [openNav, setOpenNav] = useState(false);

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
