import httpService from "@/api/http.service.js";
const ROUTE = "admin/tournaments";
export const getAll = (params) => httpService.get(ROUTE, { params });
export const getById = (id) => httpService.get(`${ROUTE}/${id}`);
export const addTournament = (body) => httpService.post(`${ROUTE}`, body);
