import { useLoaderData, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

import { TableComponent } from "@/components/table/table.js";
import { PATHS } from "@/utils/paths.js";

import { TABLE_CONFIG } from "./util.js";
const page = 1;
const rowsPerPage = 1;
export default function ResultTab() {
  const { leaderboard = [] } = useLoaderData();
  const navigate = useNavigate();

  const records = leaderboard?.records || [];

  return (
    <Stack>
      <TableComponent
        count={records?.length}
        page={page}
        rows={records}
        rowsPerPage={rowsPerPage}
        config={TABLE_CONFIG}
        onRowClick={(row) => {
          if (row?.isActive) {
            navigate(`${PATHS.admin.tournaments}/${row?.id}`);
          }
        }}
        keyField="id"
      />
    </Stack>
  );
}
