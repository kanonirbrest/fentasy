import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export const TABLE_CONFIG = [
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
    label: "Price",
    field: "price",
    id: "price",
  },
];
