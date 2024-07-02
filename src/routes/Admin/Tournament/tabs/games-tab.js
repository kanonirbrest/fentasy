import { useLoaderData, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

import { TableComponent } from "@/components/table/table.js";

import { TABLE_CONFIG } from "./games-config.js";
const page = 1;
const rowsPerPage = 1;
export default function GamesTab() {
  const { games = [], tournament } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Stack>
      <TableComponent
        count={games?.length}
        page={page}
        rows={games}
        rowsPerPage={rowsPerPage}
        config={TABLE_CONFIG}
        onRowClick={(row) => {
          navigate(
            `/admin/tournaments/${tournament?.id}/games/${row?.gameNumber}`,
          );
        }}
        keyField="teamId"
      />
    </Stack>
  );
}
