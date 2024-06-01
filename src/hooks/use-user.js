import * as React from "react";

import { UserContext } from "@/contexts/user-context.js";

export function useUser() {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
