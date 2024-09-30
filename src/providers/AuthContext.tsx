import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UserType } from "../types/user.type";

const _controllerAuth = () => {
  const [user, setUser] = useState<UserType>({} as UserType);

  const authenticated = useMemo(() => Boolean(user?.login), [user]);

  return {
    user,
    setUser,
    authenticated,
  };
};

export const CartContext = createContext(
  {} as ReturnType<typeof _controllerAuth>
);

export const useAuth = () => useContext(CartContext);

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const controller = _controllerAuth();
  return (
    <CartContext.Provider value={controller}>
      {props.children}
    </CartContext.Provider>
  );
};
