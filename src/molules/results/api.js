import httpService from "@/api/http.service.js";
const ROUTE = "tournaments";
export const getAll = (params) =>
  httpService.get(`${ROUTE}/calculate`, { params });
