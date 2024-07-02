import { useLoaderData } from "react-router-dom";
import Stack from "@mui/material/Stack";

import { TableComponent } from "@/components/table/table.js";
import { fillArray, findMaxGameNumber } from "@/utils/common.js";

const page = 0;
const rowsPerPage = 5;

export default function Team() {
  const data = useLoaderData();
  const tableConfig = [
    {
      label: "Никнейм",
      field: "nickname",
      id: "nickname",
    },
    ...fillArray(findMaxGameNumber(data?.details)).map((tour) => {
      return {
        label: `Тур ${tour}`,
        field: `tour_${tour}`,
        id: `tour_${tour}`,
      };
    }),
  ];
  const rows = Object.keys(data?.details).map((nick) => {
    const obj = {
      nickname: nick,
    };
    data?.details[nick].forEach(
      ({ gameNumber, gameScore, multipliedScore }) => {
        obj[`tour_${gameNumber}`] = `${gameScore} ` + `/ ${multipliedScore}`;
      },
    );
    return obj;
  });

  return (
    <Stack spacing={3}>
      <TableComponent
        count={rows.length}
        page={page}
        rows={rows}
        rowsPerPage={rowsPerPage}
        config={tableConfig}
        onRowClick={() => {}}
        keyField="id"
      />
    </Stack>
  );
}
