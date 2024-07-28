import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";

import { useUser } from "@/hooks/use-user.js";
import { useTournaments } from "@/molules/tournaments/store.js";
import Slider from "@/routes/Tournaments/Slider/index.js";
import { ROLE } from "@/utils/constant.js";
import { PATHS } from "@/utils/paths.js";

export default function Tournaments() {
  const [tournaments, fetch] = useTournaments((state) => [
    state.list,
    state.fetch,
  ]);
  const list = tournaments;
  const navigate = useNavigate();
  const { user } = useUser();
  React.useEffect(() => {
    fetch();
  }, []);
  const onAdd = () => {
    navigate(PATHS.admin.tournamentAdd);
  };
  return (
    <Stack
      spacing={3}
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {user?.role === ROLE.ADMIN && (
        <Stack direction="row" spacing={3}>
          <div>
            <Button
              startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
              variant="contained"
              onClick={onAdd}
            >
              Добавить команду
            </Button>
          </div>
        </Stack>
      )}
      {!!list?.length && <Slider list={list} />}
    </Stack>
  );
}
