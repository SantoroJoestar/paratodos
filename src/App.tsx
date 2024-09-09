/* eslint-disable prettier/prettier */
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types/routes.type";

// Pages
import { Login } from "./screens/Login";
import { MainMenu } from "./screens/MainMenu";
import { Profile } from "./screens/Profile";
import { Game } from "./screens/Game";

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainMenu" component={MainMenu} />
        {/* <Stack.Screen name="Game" component={GamesScreen} /> */}
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
