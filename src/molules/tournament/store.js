import { create } from "zustand";

const initialState = {
  filter: "",
  squad: [],
  players: [],
  balance: 4000,
  name: "",
};

export const useTournament = create((set, get) => ({
  ...initialState,
  setSquad: (squad) => {
    set({
      squad,
    });
  },
  setFilter: (filter) => {
    set({
      filter,
    });
  },
  setPlayers: (players) => {
    set({
      players,
    });
  },
  setBalance: (balance) => {
    set({
      balance,
    });
  },
  setName: (name) => {
    set({
      name,
    });
  },
}));
