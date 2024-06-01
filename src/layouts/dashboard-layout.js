import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import GlobalStyles from "@mui/material/GlobalStyles";

import { AuthGuard } from "@/components/auth/auth-guard.js";
import { navItems } from "@/components/layout/config.js";
import { MainNav } from "@/components/layout/main-nav.js";
import { SideNav } from "@/components/layout/side-nav.js";

export function Layout() {
  return (
    <AuthGuard>
      <GlobalStyles
        styles={{
          body: {
            "--MainNav-height": "56px",
            "--MainNav-zIndex": 1000,
            "--SideNav-width": "280px",
            "--SideNav-zIndex": 1100,
            "--MobileNav-width": "320px",
            "--MobileNav-zIndex": 1100,
          },
        }}
      />
      <Box
        sx={{
          bgcolor: "var(--mui-palette-background-default)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          minHeight: "100%",
        }}
      >
        <SideNav navItems={navItems} />
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            pl: { lg: "var(--SideNav-width)" },
          }}
        >
          <MainNav />
          <main>
            <Container maxWidth="xl" sx={{ py: "64px" }}>
              <Outlet />
            </Container>
          </main>
        </Box>
      </Box>
    </AuthGuard>
  );
}
