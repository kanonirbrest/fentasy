import httpService from "@/api/http.service.js";
const ROUTE_ADMIN = "admin/tournaments";
export const getAllAdmin = (params) => httpService.get(ROUTE_ADMIN, { params });
export const getTournamentById = (id) =>
  httpService.get(`tournaments/active/${id}`);
export const getTournamentLeaderboard = (id) =>
  httpService.get(`tournaments/active/${id}/leaderboard`);
export const getTournamentTable = (id) =>
  httpService.get(`tournaments/active/${id}/table`);
export const getTournamentGames = (id) =>
  httpService.get(`tournaments/active/${id}/games`);
export const activateTournament = (body) =>
  httpService.put(`${ROUTE_ADMIN}/activate`, body);
export const deleteTournament = (id) =>
  httpService.delete(`${ROUTE_ADMIN}/${id}`);
export const getGameList = (tournamentId) =>
  httpService.get(`${ROUTE_ADMIN}/${tournamentId}/games`);
export const getGameById = (tournamentId, gameId) =>
  httpService.get(`${ROUTE_ADMIN}/${tournamentId}/games/${gameId}`);
export const deleteGame = (tournamentId, gameId) =>
  httpService.delete(`${ROUTE_ADMIN}/${tournamentId}/games/${gameId}`);
export const setGameResult = (body) =>
  httpService.post(`admin/games/result`, body);
export const calculateResult = (id) => {
  httpService.put(`${ROUTE_ADMIN}/calculate`, { tournamentId: id });
};
