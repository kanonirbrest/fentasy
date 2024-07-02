import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export const TABLE_CONFIG = [
  {
    label: "Название",
    field: "nickname",
    id: "nickname",
    filter: (row) => {
      return (
        <>
          <Avatar src={row.avatar} />
          <Typography variant="subtitle2">{row.nickname}</Typography>
        </>
      );
    },
  },
  {
    label: "Баллов",
    field: "gamePoints",
    id: "gamePoints",
  },
  {
    label: "Доп баллов",
    field: "extraPoints",
    id: "extraPoints",
  },
  {
    label: "ЛХ?",
    field: "bestMove",
    id: "bestMove",
  },
  {
    label: "CI",
    field: "ci",
    id: "ci",
  },
  {
    label: "Всего баллов",
    field: "totalPoints",
    id: "totalPoints",
  },
  {
    label: "Фентази",
    field: "score",
    id: "score",
  },
  {
    label: "Роль",
    field: "role",
    id: "role",
  },
];
