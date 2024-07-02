import * as React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormLabel } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PlusCircle, Trash, Upload } from "@phosphor-icons/react";
import dayjs from "dayjs";

import { addTournament } from "@/molules/tournaments/api.js";
import schema from "@/routes/Admin/Tournaments/schema.js";
import { PATHS } from "@/utils/paths.js";

import classes from "./add.module.scss";

const defaultValues = {
  name: "",
  endDate: dayjs(),
  startDate: dayjs(),
  players: [
    {
      nickname: "test",
      price: 100,
    },
  ],
  teamMembersCount: 1,
  startBalance: 1,
};

export function TournamentAdd() {
  const navigate = useNavigate();

  const [isPending, setIsPending] = React.useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "players",
  });

  const onSubmit = async (values, e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsPending(true);

    try {
      addTournament(values).then(
        () => {
          navigate(PATHS.admin.tournaments);
        },
        (err) => {
          setError("root", {
            type: "server",
            message:
              Object.values(err.response.data?.errors || {}).join(",") ||
              err.response.data?.message,
          });
        },
      );
    } catch (errors) {
      console.error(errors);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Stack spacing={4}>
      <Card>
        <CardHeader title="Добавить турнир" sx={{ marginBottom: 2 }} />
        <Divider />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.name)}>
                    <InputLabel>Название</InputLabel>
                    <OutlinedInput {...field} label="Название" type="text" />
                    {errors.name ? (
                      <FormHelperText>{errors.name.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="teamMembersCount"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.teamMembersCount)}>
                    <InputLabel>Всего игроков</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Всего игроков"
                      type="number"
                    />
                    {errors.teamMembersCount ? (
                      <FormHelperText>
                        {errors.teamMembersCount.message}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="startBalance"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.startBalance)}>
                    <InputLabel>Баланс команды</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Баланс команды"
                      type="number"
                    />
                    {errors.startBalance ? (
                      <FormHelperText>
                        {errors.startBalance.message}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.startDate)}>
                    <FormLabel>Начало турнира</FormLabel>
                    <DatePicker {...field} />
                    {errors.startDate ? (
                      <FormHelperText>
                        {errors.startDate.message}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.endDate)}>
                    <FormLabel>Конец турнира</FormLabel>
                    <DatePicker {...field} />
                    {errors.endDate ? (
                      <FormHelperText>{errors.endDate.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
              <Stack spacing={4}>
                <Stack spacing={2} className={classes.players}>
                  <Typography>Игроки:</Typography>
                  {fields.map((f, index) => {
                    return (
                      <Stack key={f?.id} direction="row" spacing={2}>
                        <Controller
                          control={control}
                          name={`players[${index}].nickname`}
                          render={({ field }) => (
                            <Stack direction="row" spacing={2}>
                              <FormControl
                                fullWidth
                                error={Boolean(errors.players)}
                              >
                                <InputLabel>Никнейм</InputLabel>
                                <OutlinedInput
                                  {...field}
                                  label="Никнейм"
                                  type="text"
                                />
                                {errors.players?.[index]?.nickname ? (
                                  <FormHelperText>
                                    {errors.players[index]?.nickname.message}
                                  </FormHelperText>
                                ) : null}
                              </FormControl>
                            </Stack>
                          )}
                        />
                        <Controller
                          key={f?.id}
                          control={control}
                          name={`players[${index}].price`}
                          render={({ field }) => (
                            <Stack
                              direction="row"
                              spacing={2}
                              style={{ width: "100%" }}
                            >
                              <FormControl
                                fullWidth
                                error={Boolean(errors.players)}
                              >
                                <InputLabel>Цена</InputLabel>
                                <OutlinedInput
                                  {...field}
                                  label="Цена"
                                  type="number"
                                />
                                {errors.players?.[index]?.price ? (
                                  <FormHelperText>
                                    {errors.players[index]?.price.message}
                                  </FormHelperText>
                                ) : null}
                              </FormControl>
                              <Button
                                onClick={() => {
                                  remove(index);
                                }}
                                disabled={fields?.length === 1}
                                variant="outlined"
                                startIcon={<Trash />}
                              >
                                Удалить
                              </Button>
                            </Stack>
                          )}
                        />
                      </Stack>
                    );
                  })}
                </Stack>
                <Button
                  onClick={() => {
                    append({ nickname: "messi", price: 900 });
                  }}
                  variant="contained"
                  startIcon={<PlusCircle />}
                >
                  Добавить игрока
                </Button>
              </Stack>
              {errors.root ? (
                <Alert color="error">{errors.root.message}</Alert>
              ) : null}
              <Button
                disabled={isPending}
                type="submit"
                variant="contained"
                startIcon={<Upload />}
              >
                Сохранить
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Stack>
  );
}
