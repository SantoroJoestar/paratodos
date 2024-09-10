import { BetType } from "./bet.type";

export type GameType = {
  name: string;
  bets: BetType[];
  numbers: string[];
  date: Date;
  time: string;
};

// Milhar
// 22-22 -> 1 P -> Valor
// 22-22 -> 2, 3 P -> Valor
