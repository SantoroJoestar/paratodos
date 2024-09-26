import { CartType } from "../types/cart.type";
import { generatePule } from "../utils/generatePule";

export const CartModel = (obj: Partial<CartType> = {}): CartType => ({
    date: obj?.date || new Date(),
    games: obj?.games || [],
    pule: obj?.pule || generatePule(),
    time: obj?.time || "",
})