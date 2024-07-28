import { useLoaderData } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";

import { TableComponent } from "@/components/table/table.js";
import { TABLE_CONFIG } from "@/routes/Tournament/Edit/tabs/table-configs/details-config.js";

const page = 1;
const rowsPerPage = 1;
export default function DetailTab() {
  const { table } = useLoaderData();

  const records = table?.records;

  return (
    <Stack spacing={3}>
      <Grid lg={4} sm={6} xs={12}>
        <Stack spacing={3}>
          <TableComponent
            count={records?.length}
            page={page}
            keyField="nickname"
            rows={records}
            rowsPerPage={rowsPerPage}
            onRowClick={() => {}}
            config={TABLE_CONFIG}
          />
        </Stack>
      </Grid>
    </Stack>
  );
}
