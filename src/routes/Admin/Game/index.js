import { useLoaderData, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import dayjs from "dayjs";

import { TableComponent } from "@/components/table/table.js";
import { calculateResult } from "@/molules/tournament/api.js";
import { GAME_RESULT_LABELS } from "@/utils/constant.js";

import { TABLE_CONFIG } from "./game-config.js";
const page = 0;
const rowsPerPage = 5;
export default function Game() {
  const data = useLoaderData();
  const { tournamentId } = useParams();
  const gameInfo = data?.data;
  const rows = gameInfo?.playerResults;

  const publish = async () => {
    await calculateResult(tournamentId);
  };

  return (
    <Grid lg={4} sm={6} xs={12}>
      <Stack spacing={1} sx={{ textAlign: "start" }}>
        <Card
          component={Stack}
          spacing={3}
          direction="row"
          sx={{
            px: 3,
            py: 5,
            borderRadius: 2,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
            width="100%"
          >
            <Typography variant="h6">Игра: {gameInfo?.gameNumber} </Typography>
            <Typography variant="h6">
              Опубликована? -{" "}
              {gameInfo?.isCalculated?.toString() ? "Да" : "Нет"}
            </Typography>
            <Typography variant="h6">
              Дата: {dayjs(gameInfo?.resultDate).format("MMM D, YYYY")}
            </Typography>
            <Typography variant="h6">
              Победа: {GAME_RESULT_LABELS[gameInfo?.result]}
            </Typography>
          </Stack>
        </Card>
        <Button
          type="button"
          onClick={publish}
          disabled={gameInfo?.isCalculated}
          variant="contained"
        >
          опубликовать результаты
        </Button>
      </Stack>
      <Stack spacing={3}>
        <TableComponent
          count={rows?.length}
          page={page}
          keyField="nickname"
          rows={rows}
          rowsPerPage={rowsPerPage}
          onRowClick={() => {}}
          config={TABLE_CONFIG}
        />
      </Stack>
    </Grid>
  );
}
