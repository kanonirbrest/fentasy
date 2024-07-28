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
    key: "мои турниры",
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
    key: "аккаунт",
    title: "Аккаунт",
    href: PATHS.account,
    icon: "user",
    roles: [],
  },
  {
    key: "ошибка",
    title: "Error",
    href: PATHS.errors.notFound,
    icon: "x-square",
    roles: [],
  },
];

export const ROUTE_LABELS = {
  tournaments: "Мои турниры",
  teams: "Мои команды",
  team: "Команда",
  account: "Аккаунт",
};
