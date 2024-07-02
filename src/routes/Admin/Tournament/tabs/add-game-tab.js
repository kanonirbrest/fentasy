import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { calculateResult, setGameResult } from "@/molules/tournament/api.js";
import PlayerRow from "@/routes/Admin/Tournament/row.js";
import {
  GAME_RESULT,
  GAME_RESULT_OPTIONS,
  GAME_RESULT_OPTIONS_MAP,
  GAME_ROLES,
  RED_ROLES,
} from "@/utils/constant.js";

import schema from "./schema.js";

export default function AddGameTab({ setTab }) {
  const data = useLoaderData();
  const tournament = data?.tournament;
  const revalidator = useRevalidator();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      result: GAME_RESULT.RED,
      playerResults: tournament?.players.map((pl) => {
        return {
          nickname: pl.nickname,
          score: 0,
          role: GAME_ROLES.CITIZEN,
          gamePoints: 2.5,
          ci: 0,
          bestMove: 0,
        };
      }),
    },
    resolver: yupResolver(schema),
  });
  const { fields: playerResults } = useFieldArray({
    control,
    name: "playerResults",
  });
  const onSubmit = (values) => {
    setGameResult({
      tournamentId: tournament?.id,
      ...values,
    }).then(() => {
      revalidator.revalidate();
      setTab(0);
    });
  };
  const onChangeResult = (e) => {
    setValue("result", e.target.value);
    setResults(e.target.value);
  };
  const setResults = (value = watch("result")) => {
    setValue(
      "playerResults",
      watch("playerResults").map((p) => {
        if (RED_ROLES.includes(p?.role)) {
          if (value === GAME_RESULT.RED) {
            return { ...p, gamePoints: 2.5 };
          } else {
            return { ...p, gamePoints: 0 };
          }
        } else {
          if (value === GAME_RESULT.BLACK) {
            return { ...p, gamePoints: 2.5 };
          } else {
            return { ...p, gamePoints: 0 };
          }
        }
      }),
    );
  };

  return (
    <Stack spacing={3}>
      <Button
        type="button"
        onClick={() => {
          calculateResult(tournament?.id);
        }}
        variant="contained"
      >
        опубликовать результаты
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Stack spacing={3} direction="row">
            <Typography variant="subtitle2">Результаты игры</Typography>{" "}
            <Controller
              control={control}
              name="result"
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.role)}>
                  <Select
                    name="result"
                    color="primary"
                    variant="outlined"
                    {...field}
                    onChange={onChangeResult}
                  >
                    {GAME_RESULT_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {GAME_RESULT_OPTIONS_MAP[option]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Stack>

          <Stack spacing={2}>
            <Card>
              <Box sx={{ overflowX: "auto" }}>
                <Table sx={{ minWidth: "300px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Игрок</TableCell>
                      <TableCell>Роль</TableCell>
                      <TableCell>Баллы за победу</TableCell>
                      <TableCell>Доп баллы</TableCell>
                      <TableCell>Баллы ЛХ</TableCell>
                      <TableCell>CI</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {playerResults.map((row, index) => {
                      return (
                        <PlayerRow
                          key={row?.id}
                          row={row}
                          control={control}
                          index={index}
                          idDisabled={false}
                          setResults={setResults}
                          setValue={setValue}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Card>
            {errors.playerResults?.root ? (
              <Alert color="error">{errors.playerResults?.root?.message}</Alert>
            ) : null}
            <Button type="submit" variant="contained">
              Добавить игру
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}
