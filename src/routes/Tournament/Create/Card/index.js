import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import avatarImage from "/src/assets/avatar.jpeg";
import crosshairImage from "/src/assets/pngtree-sniper-scope-crosshair-view-png-image_3919539.jpg"; // Путь к изображению прицела

export default function PlayerCardItem({
  isActive,
  player = {},
  onAdd,
  onRemove,
  isDisabled,
  onCaptain,
  isGridView,
  isShowPrice = false,
}) {
  const { nickname, price, isCaptain } = player;

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={2.4}
      lg={2.4}
      sx={{
        position: "relative",
        border: isCaptain ? "1px solid #FFA500" : "none",
        borderRadius: "20px",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        src={avatarImage}
        sx={{
          borderRadius: "20px",
          position: "relative",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          "&:hover::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `url(${crosshairImage}) center center no-repeat`,
            pointerEvents: "none",
          },
        }}
      />
      {!isActive && (
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "10px",
            borderRadius: "5px",
            minWidth: "100px",
            textAlign: "center",
            color: isDisabled ? "grey" : "white",
          }}
        >
          {nickname} <br />
          {isShowPrice && (
            <Typography
              sx={{
                fontSize: 15,
                color: isDisabled ? "grey" : "inherit",
              }}
            >
              ({price}$)
            </Typography>
          )}
        </Box>
      )}
      {isGridView && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0,
            transition: "opacity 0.3s",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          <Button
            onClick={() => onAdd(player)}
            variant="contained"
            color="primary"
            disabled={isDisabled}
          >
            Добавить
          </Button>
        </Box>
      )}
      {!isGridView && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0,
            transition: "opacity 0.3s",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              opacity: 1,
            },
          }}
          flexDirection="column"
        >
          <Stack spacing={2}>
            <Button
              onClick={() => onRemove(player)}
              variant="contained"
              color="primary"
              disabled={isDisabled}
            >
              Удалить
            </Button>
            {!isCaptain && (
              <Button
                onClick={() => onCaptain(player)}
                variant="contained"
                color="primary"
                disabled={isDisabled}
              >
                Назначить капитаном
              </Button>
            )}
          </Stack>
        </Box>
      )}
    </Grid>
  );
}
