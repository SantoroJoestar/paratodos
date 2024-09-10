import { BetType } from "../types/bet.type";

export const calculateAmount = (betValues: BetType[]) => {
  let total = 0;
  betValues.forEach((item) => {
    total += parseFloat(item.valueBet);
  });
  return total.toFixed(2);
};
