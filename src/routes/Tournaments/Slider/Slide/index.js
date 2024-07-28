import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

import { PATHS } from "@/utils/paths.js";
const now = dayjs();

function Slide({ src, name, isActive, startDate, endDate, id }) {
  const navigate = useNavigate();
  const isExpired = dayjs(endDate).isBefore(now);
  const isStartDatePast = dayjs(startDate).isBefore(now);

  return (
    <Card sx={{ maxWidth: 545 }}>
      <Card>
        <CardMedia
          style={{ opacity: isActive ? 1 : 0.2 }}
          component="img"
          height="340"
          image={src}
        ></CardMedia>
        {isExpired && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Завершился. Дата окончания - {dayjs(endDate).format("D MMMM YYYY")}
          </Box>
        )}
        {!isExpired && !isActive && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Анонс {dayjs(startDate).format("MMM D, YYYY")}
          </Box>
        )}
      </Card>
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
        {isActive && !isStartDatePast && (
          <Button
            size="small"
            onClick={() => {
              navigate(`${PATHS.tournaments}/${id}`);
            }}
          >
            Собрать команду
          </Button>
        )}
        {isActive && isStartDatePast && (
          <Button
            size="small"
            onClick={() => {
              navigate(`${PATHS.tournaments}/${id}`);
            }}
          >
            Перейти к турниру
          </Button>
        )}
        {isStartDatePast && (
          <Button
            size="small"
            onClick={() => {
              navigate(`${PATHS.tournaments}/${id}`);
            }}
          >
            Таблица лидеров
          </Button>
        )}
        {!isActive && (
          <Button
            size="small"
            onClick={() => {
              navigate(`${PATHS.tournaments}/${id}`);
            }}
          >
            Собрать команду
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Slide;
