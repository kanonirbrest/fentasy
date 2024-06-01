import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";

import { PATHS } from "@/utils/paths.js";

export default function NotFound() {
  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minHeight: "100%",
      }}
    >
      <Stack spacing={3} sx={{ alignItems: "center", maxWidth: "md" }}>
        <Box
          component="img"
          alt="Under development"
          src="/src/assets/error-404.png"
          sx={{
            display: "inline-block",
            height: "auto",
            maxWidth: "100%",
            width: "400px",
          }}
        />
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          404: Страница не найдена
        </Typography>
        <Typography
          color="text.secondary"
          variant="body1"
          sx={{ textAlign: "center" }}
        >
          что-то пошло не так, мы уже разбираемся
        </Typography>
        <Button
          component={Link}
          to={PATHS.home}
          startIcon={<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
        >
          Вернуться на домашнюю страницу
        </Button>
      </Stack>
    </Box>
  );
}
