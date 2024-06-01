import * as React from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

import { useUser } from "@/hooks/use-user.js";
import { logger } from "@/lib/default-logger.js";
import { ROLE } from "@/utils/constant.js";
import { PATHS } from "@/utils/paths.js";

export function GuestGuard({ children }) {
  const navigate = useNavigate();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState(true);

  const checkPermissions = async () => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (user) {
      logger.debug(
        "[GuestGuard]: User is logged in, redirecting to tournaments",
      );
      if (user?.role === ROLE.ADMIN) {
        navigate(PATHS.admin.tournaments);
      } else {
        navigate(PATHS.tournaments);
      }
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user, error, isLoading]);

  if (isChecking) {
    return null;
  }

  if (error) {
    return <Alert color="error">{error}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
