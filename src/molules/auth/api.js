import httpService from "@/api/http.service.js";
const ROUTE = "/account";
export const login = (body) => httpService.post(`${ROUTE}/login`, body);
export const getById = (id) => httpService.get(`${ROUTE}/${id}`);
