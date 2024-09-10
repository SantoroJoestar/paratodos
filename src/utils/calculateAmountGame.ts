import { BetType } from "../types/bet.type";
import { GameType } from "../types/game.type";

export const calculateAmountGame = (games: GameType[]) => {
  let total = 0;
  games.forEach((game) => {
    game.bets.forEach((bet) => {
      total += parseFloat(bet.valueBet);
    });
  });
  return total.toFixed(2);
};
