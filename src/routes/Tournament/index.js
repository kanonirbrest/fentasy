import React from "react";
import { useLoaderData } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

import { CustomTabPanel } from "@/components/CustomTab/index.js";
import DetailTab from "@/routes/Tournament/tabs/detailTab.js";
import ResultTab from "@/routes/Tournament/tabs/resultTab.js";
import TeamTab from "@/routes/Tournament/tabs/teamTab.js";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Tournament() {
  const [value, setValue] = React.useState(0);
  const { tournament } = useLoaderData();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack>
      <Typography variant="h4">{tournament?.name}</Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Детали Тура" {...a11yProps(0)} />
          <Tab label="Команда" {...a11yProps(1)} />
          <Tab label="Общая таблица" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DetailTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TeamTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ResultTab />
      </CustomTabPanel>
    </Stack>
  );
}
