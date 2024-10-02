import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UserType } from "../types/user.type";

const _controllerAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);

  const login = async (u: UserType) => {
    try {
      setUser(u);
      await saveUserToStorage(u);
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  // Função para salvar os dados do usuário no AsyncStorage
  const saveUserToStorage = async (userData: UserType) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Erro ao salvar dados do usuário no AsyncStorage", error);
    }
  };

  // Função para carregar o usuário do AsyncStorage
  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar dados do usuário do AsyncStorage", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user"); // Remove os dados do AsyncStorage
      setUser(null); // Limpa o estado do usuário
    } catch (error) {
      console.error("Erro ao deslogar", error);
    }
  };

  // Efeito para restaurar o usuário quando o app é iniciado
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  // Quando o usuário é definido, salvamos os dados no AsyncStorage
  useEffect(() => {
    if (user) {
      saveUserToStorage(user);
    }
  }, [user]);

  const authenticated = useMemo(() => Boolean(user?.login), [user]);

  return {
    user,
    login,
    logout,
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
