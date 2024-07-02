import Button from "@mui/material/Button";
import { Trash } from "@phosphor-icons/react";
import dayjs from "dayjs";

import { deleteGame } from "@/molules/tournament/api.js";

export const TABLE_CONFIG = [
  {
    label: "Игра",
    field: "gameNumber",
    id: "gameNumber",
  },
  {
    label: "Результат",
    field: "result",
    id: "result",
  },
  {
    label: "Дата",
    field: "resultDate",
    id: "resultDate",
    filter: (row) => {
      return dayjs(row.resultDate).format("MMM D, YYYY");
    },
  },
  {
    label: "Действия",
    field: "actions",
    id: "actions",
    filter: (row, actionCallback) => {
      return (
        <>
          <Button
            onClick={async (e) => {
              e.stopPropagation();
              e.preventDefault();
              await deleteGame(row?.id);
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
