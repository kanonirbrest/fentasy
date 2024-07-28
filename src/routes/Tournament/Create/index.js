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

import { createTeam, updateTeam } from "@/molules/teams/api.js";
import { useTournament } from "@/molules/tournament/store.js";
import classes from "@/routes/Tournament/tournament.module.scss";
import { PATHS } from "@/utils/paths.js";

import PlayerCardItem from "./Card/index.js";

export default function CreateTournament() {
  const { tournament } = useLoaderData();
  const navigate = useNavigate();

  const [
    squad,
    balance,
    players,
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
  const hasCaptain = !!squad?.find((s) => !!s?.isCaptain);

  const isValid =
    hasCaptain &&
    !!name &&
    squad?.length === tournament?.teamMembersCount &&
    balance >= 0;
  // && (isEditMode ? tournament?.team?.id : true);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
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
        <Grid lg={12} sm={12} xs={12}>
          <Card>
            <CardHeader
              subheader={
                <Stack
                  spacing={1}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography color="text.secondary" variant="h5">
                    {`Баланс: ${balance}`}
                  </Typography>
                  <Typography color="text.secondary" variant="h5">
                    {`Количество игроков: ${squad?.length}/${tournament?.teamMembersCount}`}
                  </Typography>
                </Stack>
              }
            ></CardHeader>
            <Divider />
            <CardContent>
              <Grid container spacing={2} wrap="wrap">
                {squad.map((p) => {
                  return (
                    <PlayerCardItem
                      isGridView={false}
                      key={p.nickname}
                      player={p}
                      balance={balance}
                      onRemove={(row) => {
                        setBalance(+balance + +row?.price);
                        setSquad(
                          squad.filter((s) => s?.nickname !== row?.nickname),
                        );
                      }}
                      onCaptain={(row) => {
                        setSquad(
                          squad.map((s) => {
                            if (s.nickname === row?.nickname) {
                              return {
                                ...s,
                                isCaptain: true,
                              };
                            }
                            return {
                              ...s,
                              isCaptain: false,
                            };
                          }),
                        );
                      }}
                    />
                  );
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
        <Grid container={true} spacing={2}>
          {players
            .filter((p) => {
              return !squadIds.includes(p?.nickname);
            })
            .map((p, index) => {
              return (
                <PlayerCardItem
                  isShowPrice={true}
                  isDisabled={
                    priceMap[p?.nickname] > balance ||
                    squad?.length >= tournament?.teamMembersCount
                  }
                  isGridView={true}
                  onAdd={(row) => {
                    setSquad([...squad, row]);
                    setBalance(balance - priceMap[row?.nickname]);
                  }}
                  onRemove={() => {}}
                  nickname={p?.nickname}
                  key={index}
                  player={p}
                />
              );
            })}
        </Grid>
      </Grid>
    </Stack>
  );
}
