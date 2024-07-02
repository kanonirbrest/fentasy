export const ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
};
export const GAME_RESULT = {
  RED: "RedWin",
  BLACK: "BlackWin",
};
export const GAME_RESULT_LABELS = {
  [GAME_RESULT.RED]: "Победа мирных",
  [GAME_RESULT.BLACK]: "Победа мафии",
};

export const GAME_ROLES = {
  CITIZEN: "Citizen",
  SHERIFF: "Sheriff",
  MAFIA: "Mafia",
  DON: "Don",
};
export const GAME_RESULT_OPTIONS = Object.values(GAME_RESULT);
export const GAME_ROLES_OPTIONS = Object.values(GAME_ROLES);
export const GAME_ROLES_OPTIONS_MAP = {
  [GAME_ROLES.CITIZEN]: "Мирный",
  [GAME_ROLES.SHERIFF]: "Шериф",
  [GAME_ROLES.MAFIA]: "Мафия",
  [GAME_ROLES.DON]: "Дон",
};
export const GAME_RESULT_OPTIONS_MAP = {
  [GAME_RESULT.RED]: "Мирные",
  [GAME_RESULT.BLACK]: "Мафия",
};
export const RED_ROLES = [GAME_ROLES.CITIZEN, GAME_ROLES.SHERIFF];
export const BLACK_ROLES = [GAME_ROLES.DON, GAME_ROLES.MAFIA];
