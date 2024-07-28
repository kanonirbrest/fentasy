import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import avatarImage from "/src/assets/avatar.jpeg";

export default function PlayerCardItem({ player = {} }) {
  const { nickname } = player;

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={4}
      style={{
        position: "relative",
        border: player?.isCaptain ? "1px solid red" : "none",
        borderRadius: "20px",
      }}
    >
      <Card sx={{ maxWidth: 545 }}>
        <Card
          style={{
            position: "relative",
            border: player?.isCaptain ? "1px solid red" : "none",
            borderRadius: "20px",
          }}
        >
          <CardMedia
            component="img"
            height="340"
            image={avatarImage}
          ></CardMedia>
        </Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nickname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            12 Баллов
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
