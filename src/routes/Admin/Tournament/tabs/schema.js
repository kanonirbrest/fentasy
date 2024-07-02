import * as Yup from "yup";

import { GAME_ROLES } from "@/utils/constant.js";

const schema = Yup.object().shape({
  result: Yup.string().required(),
  playerResults: Yup.array()
    .of(
      Yup.object({
        extraPoints: Yup.number().required("обязательное поле"),
        ci: Yup.number(),
        bestMove: Yup.number(),
      }),
    )
    .test(null, "неправильные роли, должно быть 2 мафа, шериф и дон", (arr) => {
      const amountMafs = arr.filter(
        (p) => p?.role === GAME_ROLES.MAFIA,
      )?.length;
      const amountSher = arr.filter(
        (p) => p?.role === GAME_ROLES.SHERIFF,
      )?.length;
      const amountDon = arr.filter((p) => p?.role === GAME_ROLES.DON)?.length;
      const amountCitizens = arr.filter(
        (p) => p?.role === GAME_ROLES.CITIZEN,
      )?.length;
      return (
        amountCitizens === 6 &&
        amountDon === 1 &&
        amountSher === 1 &&
        amountMafs === 2
      );
    }),
});

export default schema;
