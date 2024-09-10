import { GameType } from "../types/game.type";

export const GameModel = (obj: Partial<GameType> = {}): GameType => ({
    name: obj?.name || "",
    numbers: obj?.numbers || [],
    bets: obj?.bets || [],
    time: obj?.time || "",
})