import { Controller, useController } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import {
  GAME_ROLES_OPTIONS,
  GAME_ROLES_OPTIONS_MAP,
} from "@/utils/constant.js";

export default function PlayerRow({
  idDisabled,
  row,
  index,
  control,
  setResults,
  setValue,
}) {
  const {
    formState: { errors },
  } = useController({
    control,
    name: `playerResults.${index}`,
  });
  const onRowClick = () => {};

  return (
    <TableRow
      key={index}
      onClick={() => {
        onRowClick(row);
      }}
      style={{
        cursor: "pointer",
        opacity: idDisabled ? ".5" : "1",
      }}
      hover
    >
      <TableCell>
        <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
          <Typography variant="subtitle2">{row.nickname}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Controller
          control={control}
          name={`playerResults[${index}].role`}
          render={({ field }) => (
            <FormControl
              fullWidth
              error={Boolean(errors.playerResults?.[index]?.role)}
            >
              <Select
                name={`playerResults[${index}].role`}
                variant="outlined"
                {...field}
                onChange={(e) => {
                  setValue(`playerResults[${index}].role`, e.target.value);
                  setResults();
                }}
              >
                {GAME_ROLES_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {GAME_ROLES_OPTIONS_MAP[option]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </TableCell>
      <TableCell>
        <Controller
          control={control}
          name={`playerResults.${index}.gamePoints`}
          render={({ field }) => {
            return (
              <FormControl fullWidth>
                <OutlinedInput {...field} disabled type="text" />
              </FormControl>
            );
          }}
        />
      </TableCell>
      <TableCell>
        <Controller
          control={control}
          name={`playerResults[${index}].extraPoints`}
          render={({ field }) => (
            <FormControl
              fullWidth
              error={Boolean(errors.playerResults?.[index]?.extraPoints)}
            >
              <OutlinedInput {...field} />
              {errors.playerResults?.[index]?.extraPoints ? (
                <FormHelperText>
                  {errors.playerResults?.[index]?.extraPoints.message}
                </FormHelperText>
              ) : null}
            </FormControl>
          )}
        />
      </TableCell>
      <TableCell>
        <Controller
          control={control}
          name={`playerResults[${index}].bestMove`}
          render={({ field }) => (
            <FormControl fullWidth>
              <OutlinedInput {...field} />
            </FormControl>
          )}
        />
      </TableCell>
      <TableCell>
        <Controller
          control={control}
          name={`playerResults[${index}].ci`}
          render={({ field }) => (
            <FormControl fullWidth>
              <OutlinedInput {...field} />
            </FormControl>
          )}
        />
      </TableCell>
    </TableRow>
  );
}
