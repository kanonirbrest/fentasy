import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import { TableComponent } from "@/components/table/table.js";
import { useTournament } from "@/molules/tournament/store.js";
import { TABLE_CONFIG } from "@/routes/Tournament/tabs/table-configs/details-config.js";

import classes from "./../tournament.module.scss";
const page = 1;
const rowsPerPage = 1;
export default function DetailTab() {
  const { table, tournament } = useLoaderData();
  const navigate = useNavigate();

  const [
    squad,
    balance,
    players,
    filter,
    setFilter,
    setBalance,
    setPlayers,
    setSquad,
    name,
    setName,
    reset,
  ] = useTournament((state) => [
    state.squad,
    state.balance,
    state.players,
    state.filter,
    state.setFilter,
    state.setBalance,
    state.setPlayers,
    state.setSquad,
    state.name,
    state.setName,
    state.reset,
  ]);

  React.useEffect(() => {
    console.log(tournament, "tournament");
    return () => {};
  }, [tournament?.id]);

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
