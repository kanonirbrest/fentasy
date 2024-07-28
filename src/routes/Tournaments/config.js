import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

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
    label: "Дата начала",
    field: "startDate",
    id: "startDate",
    filter: (row) => {
      return dayjs(row.startDate).format("MMM D, YYYY");
    },
  },
  {
    label: "Дата окончания",
    field: "endDate",
    id: "endDate",
    filter: (row) => {
      return dayjs(row.endDate).format("MMM D, YYYY");
    },
  },
  {
    label: "Стартовал?",
    field: "isActive",
    id: "isActive",
    filter: (row) => {
      return row.isActive ? "Да" : "Нет";
    },
  },
];

export const ensureMinimumLength = (arr, minLength) => {
  if (arr.length >= minLength) {
    return arr;
  }

  const result = [...arr];
  while (result.length < minLength) {
    result.push(...arr);
  }

  return result.slice(0, minLength);
};
