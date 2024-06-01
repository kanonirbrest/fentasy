import _ from "lodash";
import { create } from "zustand";

import { getAllTeams } from "@/molules/teams/api.js";

export const PER_PAGE = 15;

const initialState = {
  list: [],
  count: 0,
  page: 1,
};
const getQuery = (page, order_by, order_direction, title) => {
  return _.omitBy(
    {
      offset: (page - 1) * PER_PAGE || 0,
      limit: PER_PAGE,
      order_by,
      order_direction,
      search: title,
    },
    (v) => _.isUndefined(v) || _.isNull(v) || v === "",
  );
};
export const useTeams = create((set, get) => ({
  ...initialState,
  fetch: async () => {
    const { page } = get();
    const params = getQuery(page);
    const response = await getAllTeams(params);

    set({
      list: response.data,
      count: response.data,
    });
    return get();
  },
  setPage: (page) => {
    set({
      page,
    });
  },
}));
