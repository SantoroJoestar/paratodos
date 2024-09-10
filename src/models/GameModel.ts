import { GameType } from "../types/game.type";

export const GameModel = (obj: Partial<GameType> = {}): GameType => ({
    pule: obj?.pule || "",
    name: obj?.name || "",
    numbers: obj?.numbers || [],
    bets: obj?.bets || [],
    date: obj?.date || new Date(),
    time: obj?.time || "",
})