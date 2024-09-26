import { GAMES } from "../constants/GAMES";
import { BetType } from "./bet.type";

export type GameType = {
  bets: BetType[];
  numbers: string[];
  _id: keyof typeof GAMES;
};

// Milhar
// 22-22 -> 1 P -> Valor
// 22-22 -> 2, 3 P -> Valor
