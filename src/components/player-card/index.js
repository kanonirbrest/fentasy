import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { XCircle } from "@phosphor-icons/react";

import { useTournament } from "@/molules/tournament/store.js";

export function PlayerCard({ player: { nickname, price } }) {
  const [squad, balance, setBalance, setSquad] = useTournament((state) => [
    state.squad,
    state.balance,
    state.setBalance,
    state.setSquad,
  ]);
  return (
    <Grid lg={6} md={12} sm={12} xs={12}>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Stack
              direction="row"
              sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
              spacing={3}
            >
              <Stack spacing={1}>
                <Stack spacing={1} direction="row">
                  <Avatar src="/assets/avatar.png" sx={{ cursor: "pointer" }} />
                  <Typography color="text.secondary" variant="h3">
                    {nickname}
                  </Typography>
                </Stack>
                <Typography variant="h6">цена: {price}</Typography>
              </Stack>
              <Stack spacing={1} direction="row">
                <IconButton
                  onClick={() => {
                    setBalance(+balance + +price);
                    setSquad(squad.filter((s) => s?.nickname !== nickname));
                  }}
                >
                  <XCircle />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
            <Typography color="text.secondary" variant="caption">
              в команде у 21% участников
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}
