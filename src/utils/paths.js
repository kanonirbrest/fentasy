export const PATHS = {
  home: "/",
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    resetPassword: "/auth/reset-password",
  },
  admin: {
    tournaments: "/admin/tournaments",
    tournamentAdd: "/admin/tournaments/add",
    tournament: "/admin/tournaments/:id",
    game: "/admin/tournaments/:tournamentId/games/:gameId",
  },
  tournaments: "/tournaments",
  results: "/results",
  tournament: "/tournaments/:id",
  teams: "/teams",
  team: "/team/:id",
  account: "/account",
  errors: { notFound: "/errors/not-found" },
};
