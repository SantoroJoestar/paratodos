import React, { createContext, useContext, useState } from "react";
import { BetType } from "screens/Prizes";

const _controllerCart = () => {
  const [items, setItems] = useState<BetType[]>([]);

  return {
    items,
    setItems,
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
