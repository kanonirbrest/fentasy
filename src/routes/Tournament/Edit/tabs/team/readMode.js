import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
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
import { TableComponent } from "@/components/table/table.js";
import { createTeam, updateTeam } from "@/molules/teams/api.js";
import { useTournament } from "@/molules/tournament/store.js";
import PlayerCardItem from "@/routes/Tournament/Create/Card/index.js";
import { TABLE_CONFIG } from "@/routes/Tournament/Edit/tabs/table-configs/teams-config.js";
import { PATHS } from "@/utils/paths.js";

import classes from "./../tournament.module.scss";

const page = 1;
const rowsPerPage = 1;

export default function ReadMode() {
  const { tournament } = useLoaderData();
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
  const priceMap = React.useMemo(() => {
    const map = {};
    tournament?.players?.forEach(({ nickname, price }) => {
      map[nickname] = price;
    });
    return map;
  }, [tournament?.players]);

  React.useEffect(() => {
    setSquad(tournament?.team?.members || []);

    setBalance(
      tournament?.startBalance -
        (tournament?.team?.members.reduce((acc, val) => {
          return acc + (priceMap[val?.nickname] || 0);
        }, 0) || 0),
    );
    setPlayers(tournament?.players || []);
    setName(tournament?.team?.name);
    return () => {
      reset();
    };
  }, [tournament?.id]);
  const squadIds = squad.map((s) => s?.nickname);
  const onSubmitTeam = async () => {
    if (tournament?.team?.id) {
      await updateTeam({
        name: name,
        members: squad.map((s) => s.nickname),
        captain:
          squad.find((pl) => {
            return !!pl.isCaptain;
          })?.nickname || squad[0].nickname,
        id: tournament?.team?.id,
      });
    } else {
      await createTeam({
        name: name,
        members: squad.map((s) => s.nickname),
        captain:
          squad.find((pl) => {
            return !!pl.isCaptain;
          })?.nickname || squad[0].nickname,
        tournamentId: tournament?.id,
      });
    }

    navigate(PATHS.teams);
  };
  const isEditMode = !!tournament?.team?.id;
  const hasCaptain = squad?.find((s) => s?.isCaptain);

  const isValid =
    hasCaptain &&
    !!name &&
    squad?.length === tournament?.teamMembersCount &&
    balance >= 0 &&
    (isEditMode ? tournament?.team?.id : true);
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="h4">Место: {tournament?.team?.rank}</Typography>
          <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
            Баллы: {tournament?.team?.score}
          </Typography>
        </Stack>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Card sx={{ p: 2 }}>
            <FormControl fullWidth required>
              <InputLabel>Название команды</InputLabel>
              <OutlinedInput
                label="Название команды"
                name="name"
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
            ></CardHeader>
            <Divider />
            <CardContent>
              <Grid container spacing={2} wrap="wrap">
                {squad.map((p) => {
                  return <PlayerCardItem key={p.nickname} player={p} />;
                })}
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              {!hasCaptain && !!squad?.length && (
                <Alert severity="info">
                  Выберите капитана нажав на <b>CC</b>, Баллы капитана
                  удваиваются.
                </Alert>
              )}
              <Button
                disabled={!isValid}
                onClick={onSubmitTeam}
                variant="contained"
                style={{ marginLeft: "auto" }}
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
              keyField="nickname"
              rows={players
                .filter((p) => {
                  return !squadIds.includes(p?.nickname);
                })
                .filter((p) =>
                  p.nickname.toLowerCase().includes(filter.toLowerCase()),
                )}
              isRowDisabled={(row) => {
                return (
                  priceMap[row?.nickname] > balance ||
                  squad?.length >= tournament?.teamMembersCount
                );
              }}
              rowsPerPage={rowsPerPage}
              onRowClick={(row) => {
                setSquad([...squad, row]);
                setBalance(balance - priceMap[row?.nickname]);
              }}
              config={TABLE_CONFIG}
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
