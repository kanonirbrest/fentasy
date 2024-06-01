import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Play, Trash } from "@phosphor-icons/react";
import dayjs from "dayjs";

import {
  activateTournament,
  deleteTournament,
} from "@/molules/tournament/api.js";

import "dayjs/locale/ru";
dayjs.locale("ru");

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
      return row.isActive.toString();
    },
  },
  {
    label: "Стартовал?",
    field: "isActive",
    id: "isActive",
    filter: (row, actionCallback) => {
      return (
        <>
          <Button
            startIcon={<Play fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={async (e) => {
              e.stopPropagation();
              e.preventDefault();
              await activateTournament({ id: row?.id });
              actionCallback();
            }}
            disabled={row?.isActive}
          >
            Запустить
          </Button>
          <Button
            onClick={async (e) => {
              e.stopPropagation();
              e.preventDefault();
              await deleteTournament(row?.id);
              actionCallback();
            }}
            variant="outlined"
            color="warning"
            startIcon={<Trash />}
          >
            Удалить
          </Button>
        </>
      );
    },
  },
];
