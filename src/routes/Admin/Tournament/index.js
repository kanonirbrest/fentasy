import React from "react";
import { useLoaderData } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

import { CustomTabPanel } from "@/components/CustomTab/index.js";
import Iconify from "@/nested/components/iconify/index.js";
import AddGameTab from "@/routes/Admin/Tournament/tabs/add-game-tab.js";
import GamesTab from "@/routes/Admin/Tournament/tabs/games-tab.js";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function AdminTournament() {
  const data = useLoaderData();
  const tournament = data?.tournament;
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h4">{tournament?.name} </Typography>
        <Iconify icon="fluent-emoji-flat:sports-medal" />
      </Stack>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Игры" {...a11yProps(0)} />
          <Tab label="Добавить игру" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tab} index={0}>
        <GamesTab />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={1}>
        <AddGameTab setTab={setTab} />
      </CustomTabPanel>
    </Stack>
  );
}
