import * as React from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

import { useUser } from "@/hooks/use-user.js";
import { ROLE } from "@/utils/constant.js";
import { PATHS } from "@/utils/paths.js";

export function AdminGuard({ children }) {
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState(true);
  const navigate = useNavigate();

  const checkPermissions = async () => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (!user.role === ROLE.ADMIN) {
      navigate(PATHS.home);
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
  }, [user, error, isLoading]);

  if (isChecking) {
    return null;
  }

  if (error) {
    return <Alert color="error">{error}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
