import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import { Filter } from "@/components/filter/filter.js";
import { PlayerCard } from "@/components/player-card/index.js";
import { TableComponent } from "@/components/table/table.js";
import { createTeam } from "@/molules/teams/api.js";
import { useTournament } from "@/molules/tournament/store.js";
import { TABLE_CONFIG } from "@/routes/Tournament/config.js";
import { PATHS } from "@/utils/paths.js";

import classes from "./tournament.module.scss";

const page = 1;
const rowsPerPage = 1;
export default function Tournament() {
  const tournament = useLoaderData();
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
  ]);

  React.useEffect(() => {
    setPlayers(tournament?.players);
    setBalance(tournament?.startBalance);
  }, [tournament?.id]);
  const squadIds = squad.map((s) => s?.nickname);
  const onSubmitTeam = async () => {
    await createTeam({
      name: name,
      members: squad.map((s) => s.nickname),
      captain: squad[0].nickname,
      tournamentId: tournament?.id,
    });
    navigate(PATHS.teams);
  };

  const isValid =
    !!name && squad?.length === tournament?.teamMembersCount && balance >= 0;
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">{tournament?.name}</Typography>
          <Card sx={{ p: 2 }}>
            <FormControl fullWidth required>
              <InputLabel>Название команды</InputLabel>
              <OutlinedInput
                label="Название команды"
                name="team_name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>
          </Card>
        </Stack>
      </Stack>
      <Grid container spacing={2} className={classes.container}>
        <Grid lg={8} sm={6} xs={12}>
          <Card>
            <CardHeader
              subheader={
                <Stack spacing={1}>
                  <Typography color="text.secondary" variant="body2">
                    {`Баланс: ${balance}`}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {`Количество игроков: ${squad?.length}/${tournament?.teamMembersCount}`}
                  </Typography>
                </Stack>
              }
              title="Выбор команды"
            ></CardHeader>
            <Divider />
            <CardContent>
              <Grid container spacing={2} wrap="wrap">
                {squad.map((p) => {
                  return <PlayerCard key={p.id} player={p} />;
                })}
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                disabled={!isValid}
                onClick={onSubmitTeam}
                variant="contained"
              >
                Сохранить
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid lg={4} sm={6} xs={12}>
          <Stack spacing={3}>
            <Filter
              placeholder="Искать игрока"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            />
            <TableComponent
              count={players?.length}
              page={page}
              rows={players
                .filter((p) => {
                  return !squadIds.includes(p?.nickname);
                })
                .filter((p) =>
                  p.nickname.toLowerCase().includes(filter.toLowerCase()),
                )}
              isRowDisabled={(row) => {
                return row?.price > balance;
              }}
              rowsPerPage={rowsPerPage}
              onRowClick={(row) => {
                setSquad([...squad, row]);
                setBalance(balance - +row?.price);
              }}
              config={TABLE_CONFIG}
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
