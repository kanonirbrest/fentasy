import { useLoaderData } from "react-router-dom";

import CreateTournament from "@/routes/Tournament/Create/index.js";
import EditTournament from "@/routes/Tournament/Edit/index.js";

export default function Tournament() {
  const data = useLoaderData();

  if (data?.tournament?.team) {
    return <EditTournament />;
  }

  return <CreateTournament />;
}
