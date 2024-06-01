import { ROLE } from "@/utils/constant.js";
import { PATHS } from "@/utils/paths.js";
export const navItems = [
  {
    key: "турниры",
    title: "Турниры",
    href: PATHS.admin.tournaments,
    icon: "list",
    roles: [ROLE.ADMIN],
  },
  {
    key: "турниры",
    title: "Мои турниры",
    href: PATHS.tournaments,
    icon: "list",
    roles: [ROLE.USER],
  },
  {
    key: "команды",
    title: "Мои Команды",
    href: PATHS.teams,
    icon: "list",
    roles: [ROLE.USER],
  },
  {
    key: "account",
    title: "Аккаунт",
    href: PATHS.account,
    icon: "user",
    roles: [],
  },
  {
    key: "error",
    title: "Error",
    href: PATHS.errors.notFound,
    icon: "x-square",
    roles: [],
  },
];
