/* eslint-disable prettier/prettier */
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { RootStackParamList } from "../types/routes.type";

// Pages
import { Login } from "../screens/Login";
import { MainMenu } from "../screens/MainMenu";
import { Profile } from "../screens/Profile";
import { Game } from "../screens/Game";
import { GameWithInput } from "../screens/GameWithInput";
import { MenuGames } from "../screens/MenuGames";
import { Prizes } from "../screens/Prizes";
import { ConfirmGame } from "../screens/ConfirmGame";
import { GAMES } from "../constants/GAMES";
import { Cart } from "../screens/Cart";
import { useAuth } from "./AuthContext";
import { LoadingScreen } from "../screens/LoadingScreen";
import { enableScreens } from "react-native-screens";

enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

export const Routes = () => {
  const { authenticated } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando uma verificação de autenticação (pode ser uma chamada à API)
    const checkAuth = async () => {
      // Imagine que você tem uma função para verificar a autenticação
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulando atraso
      setLoading(false);
    };

    setLoading(true);
    checkAuth();
  }, [authenticated]);

  if (loading) {
    // Retornar uma tela de carregamento enquanto verificamos a autenticação
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 500,
          },
          animationEnabled: false,
          gestureDirection: "horizontal", // Define a direção do gesto como horizontal
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Animação padrão de transição horizontal
        }}
      >
        {!authenticated && (
          <Stack.Screen
            name="Login"
            options={{ title: "", headerShown: false }}
            component={Login}
          />
        )}
        {authenticated && (
          <>
            <Stack.Screen
              name="MainMenu"
              options={{ title: "Menu Principal" }}
              component={MainMenu}
            />
            <Stack.Screen
              name="MenuGames"
              options={{ title: "Jogos" }}
              component={MenuGames}
            />
            <Stack.Screen
              name="Cart"
              options={{ title: "Carrinho" }}
              component={Cart}
            />
            <Stack.Screen
              name="ConfirmGame"
              options={{ title: "Confirmar Jogo" }}
              component={ConfirmGame}
            />
            <Stack.Screen
              name="Game"
              options={({ route }) => ({
                headerTitle:
                  GAMES[route.params?.type].label +
                    " (" +
                    route.params?.pule +
                    ")" || "Jogo",
              })}
              component={GameWithInput}
            />
            <Stack.Screen
              name="Prizes"
              options={{ title: "" }}
              component={Prizes}
            />
            <Stack.Screen
              name="Profile"
              options={{ title: "Meu Perfil" }}
              component={Profile}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
