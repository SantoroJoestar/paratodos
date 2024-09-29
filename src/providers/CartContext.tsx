import React, { createContext, useContext, useState } from "react";
import { GameModel } from "../models/GameModel";
import { GameType } from "../types/game.type";

import { CartType } from "../types/cart.type";
import { CartModel } from "../models/CartModel";

const _controllerCart = () => {
  const [currentGame, setCurrentGame] = useState<GameType>(GameModel());

  const [cart, setCart] = useState<CartType>(CartModel());

  const newCart = () => setCart(CartModel());

  const removeFromCart = (index: number) => {
    setCart((prev) => ({
      ...prev,
      games: prev.games.filter((_, i) => i !== index),
    }));
  };

  return {
    newCart,
    cart,
    setCart,
    currentGame,
    setCurrentGame,
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
