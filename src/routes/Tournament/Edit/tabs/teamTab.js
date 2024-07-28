import React from "react";
import { useLoaderData } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import { useTournament } from "@/molules/tournament/store.js";
import PlayerCardItem from "@/routes/Tournament/Create/Card/Vew.js";

import classes from "../../tournament.module.scss";

export default function TeamTab() {
  const { tournament } = useLoaderData();

  const [squad, setBalance, setPlayers, setSquad, name, setName, reset] =
    useTournament((state) => [
      state.squad,
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

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="h3">{name}</Typography>
          <Typography variant="h5">Место: {tournament?.team?.rank}</Typography>
          <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
            Баллы: {tournament?.team?.score}
          </Typography>
        </Stack>
      </Stack>
      <Grid container spacing={2} className={classes.container}>
        <Grid lg={12} sm={12} xs={12}>
          <Card>
            <CardHeader title="Моя команда"></CardHeader>
            <CardContent>
              <Grid container spacing={2} wrap="wrap">
                {squad.map((p) => {
                  return <PlayerCardItem key={p.nickname} player={p} />;
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
