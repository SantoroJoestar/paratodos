import { BetType } from "./bet.type";
import { GameType } from "./game.type";

export type CartType = {
  pule: string;
  dateBet: Date;
  dateCreated: Date;
  time: string;
  games: GameType[];
};

// Milhar
// 22-22 -> 1 P -> Valor
// 22-22 -> 2, 3 P -> Valor
