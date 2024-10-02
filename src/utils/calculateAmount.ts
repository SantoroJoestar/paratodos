import { BetType } from "../types/bet.type";

export const calculateAmount = (betValues: BetType[]) => {
  let total = 0;
  betValues.forEach((item) => {
    total += item.valueBet;
  });
  return total;
};
