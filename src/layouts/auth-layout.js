import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Logo from "@/assets/logo.svg?react";
import { GuestGuard } from "@/components/auth/guest-guard.js";
import { PATHS } from "@/utils/paths.js";

export function AuthLayout() {
  return (
    <GuestGuard>
      <Box
        sx={{
          display: { xs: "flex", lg: "grid" },
          flexDirection: "column",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100%",
        }}
      >
        <Box
          sx={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}
        >
          <Box sx={{ p: 3 }}>
            <Box
              component={Link}
              href={PATHS.home}
              sx={{ display: "inline-block", fontSize: 0 }}
            >
              <Logo />
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flex: "1 1 auto",
              justifyContent: "center",
              p: 3,
            }}
          >
            <Box sx={{ maxWidth: "450px", width: "100%" }}>
              <Outlet />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            background:
              "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
            color: "var(--mui-palette-common-white)",
            display: { xs: "none", lg: "flex" },
            justifyContent: "center",
            p: 3,
          }}
        >
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography
                color="inherit"
                sx={{
                  fontSize: "24px",
                  lineHeight: "32px",
                  textAlign: "center",
                }}
                variant="h1"
              >
                Добро пожаловать{" "}
              </Typography>
              <Typography
                color="inherit"
                sx={{
                  fontSize: "24px",
                  lineHeight: "32px",
                  textAlign: "center",
                  color: "#15b79e",
                }}
                variant="h1"
              >
                Мафия фентази
              </Typography>
            </Stack>
            {/*<Box sx={{ display: "flex", justifyContent: "center" }}>*/}
            {/*  <Box*/}
            {/*    component="img"*/}
            {/*    alt="Widgets"*/}
            {/*    src="/assets/auth-widgets.png"*/}
            {/*    sx={{ height: "auto", width: "100%", maxWidth: "600px" }}*/}
            {/*  />*/}
            {/*</Box>*/}
          </Stack>
        </Box>
      </Box>
    </GuestGuard>
  );
}
