import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export const TABLE_CONFIG = [
  {
    label: "Название",
    field: "name",
    id: "name",
    filter: (row) => {
      return (
        <>
          <Avatar src={row.avatar} />
          <Typography variant="subtitle2">{row.name}</Typography>
        </>
      );
    },
  },
  {
    label: "Место",
    field: "place",
    id: "place",
  },
  {
    label: "Турнир",
    field: "tournamentName",
    id: "tournamentName",
  },
  {
    label: "Баллы",
    field: "score",
    id: "score",
  },
];
