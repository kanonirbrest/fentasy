import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";

import { TableComponent } from "@/components/table/table.js";
import { useUser } from "@/hooks/use-user.js";
import { useTournaments } from "@/molules/tournaments/store.js";
import { TABLE_CONFIG } from "@/routes/Tournaments/config.js";
import { ROLE } from "@/utils/constant.js";
import { PATHS } from "@/utils/paths.js";

export default function Tournaments() {
  const page = 0;
  const rowsPerPage = 5;
  const [tournaments, fetch] = useTournaments((state) => [
    state.list,
    state.fetch,
  ]);
  const paginatedList = applyPagination(tournaments, page, rowsPerPage);
  const navigate = useNavigate();
  const { user } = useUser();
  React.useEffect(() => {
    fetch();
  }, []);
  const onAdd = () => {
    navigate(PATHS.admin.tournamentAdd);
  };
  return (
    <Stack spacing={3}>
      {user?.role === ROLE.ADMIN && (
        <Stack direction="row" spacing={3}>
          <div>
            <Button
              startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
              variant="contained"
              onClick={onAdd}
            >
              Добавить команду
            </Button>
          </div>
        </Stack>
      )}
      <TableComponent
        count={paginatedList.length}
        page={page}
        rows={paginatedList}
        rowsPerPage={rowsPerPage}
        config={TABLE_CONFIG}
        onRowClick={(row) => {
          navigate(`${PATHS.tournaments}/${row?.id}`);
        }}
        keyField="id"
      />
    </Stack>
  );
}

function applyPagination(rows, page, rowsPerPage) {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
