import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

import { PATHS } from "@/utils/paths.js";

function Slide({ src, name, isActive, startDate, id }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 545 }}>
      <CardMedia component="img" height="340" image={src} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Старт турнира: {dayjs(startDate).format("MMM D, YYYY")} <br />
          Начался: {isActive ? "Да" : "Нет"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            navigate(`${PATHS.tournaments}/${id}`);
          }}
        >
          Перейти к турниру
        </Button>
        <Button
          size="small"
          onClick={() => {
            navigate(`${PATHS.tournaments}/${id}`);
          }}
        >
          Таблица лидеров
        </Button>
      </CardActions>
    </Card>
  );
}

export default Slide;
