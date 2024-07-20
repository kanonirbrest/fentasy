import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export const TABLE_CONFIG = [
  {
    label: "Место",
    field: "place",
    id: "place",
    width: "5%",
  },
  {
    label: "Name",
    field: "nickname",
    id: "name",
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
    label: "Побед",
    field: "wins",
    id: "wins",
  },
  {
    label: "Очков всего",
    field: "totalPoints",
    id: "totalPoints",
  },
  {
    label: "Очков в туре",
    field: "score",
    id: "score",
  },
];
