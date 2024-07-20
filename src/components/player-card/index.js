import React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { XCircle } from "@phosphor-icons/react";

import { useTournament } from "@/molules/tournament/store.js";

import avatarImage from "/src/assets/avatar.jpeg";

export function PlayerCard({ player: { nickname, price, isCaptain } }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [squad, balance, setBalance, setSquad] = useTournament((state) => [
    state.squad,
    state.balance,
    state.setBalance,
    state.setSquad,
  ]);

  return (
    <Grid lg={2} md={12} sm={12} xs={12}>
      <Card
        style={{
          border: "1px solid white",
          ...(isCaptain && { border: "1px solid red" }),
        }}
      >
        <IconButton
          onClick={() => {
            setBalance(+balance + +price);
            setSquad(squad.filter((s) => s?.nickname !== nickname));
          }}
          sx={{
            position: "absolute",
            right: "2px",
          }}
        >
          <XCircle />
        </IconButton>
        <CardContent>
          <Stack
            direction="column"
            alignItems="center"
            spacing={1}
            justifyContent="center"
          >
            <Avatar
              onClick={handleClick}
              src={avatarImage}
              sx={{
                height: 80,
                width: 80,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <Typography variant="subtitle2">
              {nickname} - {price}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          disabled={isCaptain}
          onClick={() => {
            setSquad(
              squad.map((s) => {
                if (s.nickname === nickname) {
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
            handleClose();
          }}
        >
          Назначить капитаном
        </MenuItem>
      </Menu>
    </Grid>
  );
}
