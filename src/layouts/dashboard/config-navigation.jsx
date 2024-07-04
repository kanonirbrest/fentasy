import SvgColor from "@/components/svg-color/index.js";
import { ROLE } from "@/utils/constant.js";
import { PATHS } from "@/utils/paths.js";

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "Турниры",
    path: PATHS.admin.tournaments,
    icon: icon("ic_analytics"),
    roles: [ROLE?.ADMIN],
  },
  {
    title: "Мои Турниры",
    path: PATHS.tournaments,
    icon: icon("ic_analytics"),
    roles: [ROLE.USER],
  },
  {
    key: "команды",
    title: "Мои Команды",
    path: PATHS.teams,
    icon: icon("ic_analytics"),
    roles: [ROLE.USER],
  },
  {
    key: "аккаунт",
    title: "Аккаунт",
    href: PATHS.account,
    icon: icon("ic_user"),
    roles: [ROLE?.ADMIN, ROLE?.USER],
  },
  {
    title: "Ошибка",
    path: PATHS.errors.notFound,
    icon: icon("ic_disabled"),
    roles: [ROLE?.ADMIN, ROLE?.USER],
  },
];
export default navConfig;
