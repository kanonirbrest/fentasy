import httpService from "@/api/http.service.js";
const ROUTE = "teams";
export const getAllTeams = (params) => httpService.get(ROUTE, { params });
export const getTeamById = (id) => httpService.get(`${ROUTE}/${id}`);
export const createTeam = (body) => httpService.post(`${ROUTE}`, body);
