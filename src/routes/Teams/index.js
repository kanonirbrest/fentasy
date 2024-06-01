import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";

import { TableComponent } from "@/components/table/table.js";
import { useUser } from "@/hooks/use-user.js";
import { useTeams } from "@/molules/teams/store.js";
import { ROLE } from "@/utils/constant.js";
import { PATHS } from "@/utils/paths.js";

import { TABLE_CONFIG } from "./config.js";

export default function Teams() {
  const page = 0;
  const rowsPerPage = 5;
  const [teams, fetch] = useTeams((state) => [state.list, state.fetch]);
  const paginatedList = applyPagination(teams, page, rowsPerPage);
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
              Добавить
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
          navigate(`${PATHS.tournaments}/${row?.tournamentId}`);
        }}
      />
    </Stack>
  );
}

function applyPagination(rows, page, rowsPerPage) {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
