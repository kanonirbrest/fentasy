import httpService from "@/api/http.service.js";
const ROUTE_ADMIN = "admin/tournaments";
const ROUTE = "tournaments";
export const getAllAdmin = (params) => httpService.get(ROUTE_ADMIN, { params });
export const getByIdAdmin = (id) => httpService.get(`${ROUTE_ADMIN}/${id}`);
export const activateTournament = (body) =>
  httpService.put(`${ROUTE_ADMIN}/activate`, body);
export const deleteTournament = (id) =>
  httpService.delete(`${ROUTE_ADMIN}/${id}`);
