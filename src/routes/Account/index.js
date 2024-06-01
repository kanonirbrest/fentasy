import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import { AccountDetailsForm } from "@/components/account/account-details-form.js";
import { AccountInfo } from "@/components/account/account-info.js";

export default function Account() {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Аккаунт</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <AccountInfo />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <AccountDetailsForm />
        </Grid>
      </Grid>
    </Stack>
  );
}
