import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  endDate: Yup.date().required(),
  startDate: Yup.date().required(),
  teamMembersCount: Yup.number().min(1),
  startBalance: Yup.number().min(1),
  players: Yup.array().of(
    Yup.object({
      nickname: Yup.string().required(),
      price: Yup.number().required().min(1),
    }),
  ),
});

export default schema;
