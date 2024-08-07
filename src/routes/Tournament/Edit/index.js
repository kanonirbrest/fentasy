import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { CustomTabPanel } from "@/components/CustomTab/index.js";
import DetailTab from "@/routes/Tournament/Edit/tabs/detailTab.js";
import ResultTab from "@/routes/Tournament/Edit/tabs/resultTab.js";
import TeamTab from "@/routes/Tournament/Edit/tabs/teamTab.js";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function EditTournament() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack>
      {/*<Typography variant="h4">{tournament?.name}</Typography>*/}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Команда" {...a11yProps(0)} />
          <Tab label="Детали Тура" {...a11yProps(1)} />
          <Tab label="Общая таблица" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TeamTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <DetailTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ResultTab />
      </CustomTabPanel>
    </Stack>
  );
}
