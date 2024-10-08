import React, { createContext, useContext, useState, useCallback } from "react";
import { GameModel } from "../models/GameModel";
import { GameType } from "../types/game.type";
import { CartType } from "../types/cart.type";
import { CartModel } from "../models/CartModel";

const _controllerCart = () => {
  const [currentGame, setCurrentGame] = useState<GameType>(GameModel());
  const [cart, setCart] = useState<CartType>(CartModel());

  const [chaveValendo, setChaveValendo] = useState(false);
  const [showChave, setShowChave] = useState(false);

  // Função para resetar o carrinho
  const newCart = useCallback(() => {
    setCart(CartModel());
    setShowChave(false);
    setChaveValendo(false);
  }, []);

  // Função para remover um jogo do carrinho por índice
  const removeFromCart = useCallback((index: number) => {
    setCart((prev) => ({
      ...prev,
      games: prev.games.filter((_, i) => i !== index),
    }));
  }, []);

  return {
    newCart,
    cart,
    setCart,
    currentGame,
    setCurrentGame,
    removeFromCart,
    chaveValendo,
    setChaveValendo,
    showChave,
    setShowChave,
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
