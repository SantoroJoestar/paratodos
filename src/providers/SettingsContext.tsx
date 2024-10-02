import React, { createContext, useContext, useState } from "react";

const _controllerSetttings = () => {
  const [chaveValendo, setChaveValendo] = useState(false);
  const [showChave, setShowChave] = useState(false);

  console.log("atualizou settings provider");

  return {
    chaveValendo,
    setChaveValendo,
    showChave,
    setShowChave,
  };
};

export const CartContext = createContext(
  {} as ReturnType<typeof _controllerSetttings>
);

export const useSettings = () => useContext(CartContext);

export const SettingsProvider = (props: { children: React.ReactNode }) => {
  const controller = _controllerSetttings();
  return (
    <CartContext.Provider value={controller}>
      {props.children}
    </CartContext.Provider>
  );
};

// CHAVE VALENDO = TRUE

// formato 0000
// MILHAR
// 1234
// 5678

// formato 000
// CENTENA
// 234
// 678

// formato 00
// DEZENA
// 34
// 78

// formato 00-00
// DUQUE-DEZENA
// 12-34
// 56-78
