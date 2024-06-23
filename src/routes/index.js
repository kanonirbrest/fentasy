import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import { SignInForm } from "@/components/auth/sign-in-form.js";
import { SignUpForm } from "@/components/auth/sign-up-form.js";
import { UserProvider } from "@/contexts/user-context.js";
import { AuthLayout } from "@/layouts/auth-layout.js";
import { Layout } from "@/layouts/dashboard-layout.js";
import {
  getTournamentById,
  getTournamentLeaderboard,
  getTournamentTable,
} from "@/molules/tournament/api.js";
import Account from "@/routes/Account/index.js";
import { TournamentAdd } from "@/routes/Admin/Tournaments/Add/index.js";
import NotFound from "@/routes/NotFound/index.js";
import Teams from "@/routes/Teams/index.js";
import { PATHS } from "@/utils/paths.js";

import AdminTournament from "./Admin/Tournament/index.js";
import Tournaments from "./Admin/Tournaments/index.js";
import Tournament from "./Tournament/index.js";
import UserTournaments from "./Tournaments/index.js";

export default function RoutesView() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/auth"
          element={<AuthLayout />}
          errorElement={<NotFound />}
        >
          <Route path={PATHS.auth.signIn} element={<SignInForm />} />
          <Route path={PATHS.auth.signUp} element={<SignUpForm />} />
        </Route>
        <Route element={<Layout />} path="/" errorElement={<NotFound />}>
          <Route path="/admin">
            <Route path={PATHS.admin.tournaments} element={<Tournaments />} />
            <Route
              path={PATHS.admin.tournamentAdd}
              element={<TournamentAdd />}
            />
            <Route
              path={PATHS.admin.tournament}
              element={<AdminTournament />}
              loader={async ({ request }) => {
                const id = new URL(request.url).pathname.split("/").pop();
                try {
                  if (id) {
                    // eslint-disable-next-line testing-library/no-await-sync-queries
                    const response = await getTournamentById(id);
                    return response?.data;
                  }
                } catch (e) {
                  return null;
                }
                return null;
              }}
            />
          </Route>
          <Route
            path={PATHS.tournaments}
            element={<UserTournaments />}
            errorElement={<NotFound />}
          />
          <Route
            path={PATHS.teams}
            element={<Teams />}
            errorElement={<NotFound />}
          />
          <Route
            path={PATHS.tournament}
            loader={async ({ request }) => {
              const id = new URL(request.url).pathname.split("/").pop();

              try {
                if (id) {
                  const tournament = await getTournamentById(id);
                  const leaderboard = await getTournamentLeaderboard(id);
                  const table = await getTournamentTable(id);

                  return {
                    tournament: tournament?.data,
                    leaderboard: leaderboard?.data,
                    table: table?.data,
                  };
                }
              } catch (e) {
                return null;
              }
              return null;
            }}
            element={<Tournament />}
            errorElement={<NotFound />}
          />
          <Route
            path={PATHS.home}
            element={
              <Navigate to={PATHS.account} errorElement={<NotFound />} />
            }
          />
          <Route
            path={PATHS.account}
            element={<Account />}
            errorElement={<NotFound />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </>,
    ),
  );

  return (
    <UserProvider>
      <RouterProvider router={router} fallbackElement={<div></div>} />
    </UserProvider>
  );
}
