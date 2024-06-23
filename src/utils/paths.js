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
  },
  tournaments: "/tournaments",
  results: "/results",
  tournament: "/tournaments/:id",
  teams: "/teams",
  team: "/teams/:id",
  account: "/account",
  errors: { notFound: "/errors/not-found" },
};
