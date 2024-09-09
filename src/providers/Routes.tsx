/* eslint-disable prettier/prettier */
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/routes.type";

// Pages
import { Login } from "../screens/Login";
import { MainMenu } from "../screens/MainMenu";
import { Profile } from "../screens/Profile";
import { Game } from "../screens/Game";
import { MenuGames } from "../screens/MenuGames";
import { Prizes } from "../screens/Prizes";
import { ConfirmGame } from "../screens/ConfirmGame";
import { GAMES } from "../constants/GAMES";
import { Cart } from "../screens/Cart";

const Stack = createStackNavigator<RootStackParamList>();

export const Routes = () => {
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
        }}
      >
        <Stack.Screen
          name="Login"
          options={{ title: "", headerShown: false }}
          component={Login}
        />
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
            headerTitle: GAMES[route.params?.type].label || "Jogo",
          })}
          component={Game}
        />
        <Stack.Screen
          name="Prizes"
          options={{ title: "" }}
          component={Prizes}
        />
        <Stack.Screen
          name="Profile"
          options={{ title: "" }}
          component={Profile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
