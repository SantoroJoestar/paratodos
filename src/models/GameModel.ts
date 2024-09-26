import { GAMES } from "../constants/GAMES";
import { GameType } from "../types/game.type";

export const GameModel = (obj: Partial<GameType> = {}): GameType => ({
    numbers: obj?.numbers || [],
    bets: obj?.bets || [],
    _id: obj?._id || "",
})