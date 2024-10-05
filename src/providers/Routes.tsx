/* eslint-disable prettier/prettier */
import "react-native-gesture-handler";
import React, { lazy, useEffect, useState, Suspense } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { RootStackParamList } from "../types/routes.type";
import { enableScreens } from "react-native-screens";
import { useAuth } from "./AuthContext";
import { LoadingScreen } from "../screens/LoadingScreen";
import { GAMES } from "../constants/GAMES";

// Lazy-loaded pages
import MainMenu from "../screens/MainMenu";
import Login from "../screens/Login";

// import Profile from "../screens/Profile";
// import Game from "../screens/Game";
// import MenuGames from "../screens/MenuGames";
// import Prizes from "../screens/Prizes";
// import ConfirmGame from "../screens/ConfirmGame";
// import Cart from "../screens/Cart";
// import Scanner from "../screens/Scanner";

const Profile = lazy(() => import("../screens/Profile"));
const Game = lazy(() => import("../screens/Game"));
const MenuGames = lazy(() => import("../screens/MenuGames"));
const Prizes = lazy(() => import("../screens/Prizes"));
const ConfirmGame = lazy(() => import("../screens/ConfirmGame"));
const Cart = lazy(() => import("../screens/Cart"));
const Scanner = lazy(() => import("../screens/Scanner"));

enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

export const Routes = () => {
  const { authenticated, user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    };

    checkAuth();
  }, [authenticated]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={authenticated ? "MainMenu" : "Login"}
          screenOptions={{
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 500,
            },
            animationEnabled: false,
            gestureDirection: "horizontal",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
                name="Scanner"
                options={{ title: "Scaneie o QR Code" }}
                component={Scanner}
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
                component={Game}
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
    </Suspense>
  );
};
