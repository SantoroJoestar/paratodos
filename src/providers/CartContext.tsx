import React, { createContext, useContext, useState } from "react";
import { GameModel } from "../models/GameModel";
import { GameType } from "../types/game.type";

const _controllerCart = () => {
  const [currentGame, setCurrentGame] = useState<GameType>(GameModel());

  const [items, setItems] = useState<GameType[]>([]);

  const removeFromCart = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    currentGame,
    setCurrentGame,
    items,
    setItems,
    removeFromCart,
  };
};

export const CartContext = createContext(
  {} as ReturnType<typeof _controllerCart>
);

export const useCart = () => useContext(CartContext);

export const CartProvider = (props: { children: React.ReactNode }) => {
  const controller = _controllerCart();
  return (
    <CartContext.Provider value={controller}>
      {props.children}
    </CartContext.Provider>
  );
};
