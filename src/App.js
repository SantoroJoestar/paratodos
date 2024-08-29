/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import GamesScreen from './screens/GamesScreen';
import MilharScreen from './screens/MilharScreen';
import PrizesMilharScreen from './screens/PrizesMilharScreen';
import FinalizeGameMilharScreen from './screens/FinalizeGameMilharScreen';
import ProfileScreen from './screens/ProfileScreen';
import CentenaScreen from './screens/CentenaScreen';
import PrizesCentenaScreen from './screens/PrizesCentenaScreen';
import FinalizeCentenaScreen from './screens/FinalizeCentenaScreen';
import MilharCentenaScreen from './screens/MilharCentenaScreen';
import PrizesMilharCentenaScreen from './screens/PrizesMilharCentenaScreen';
import FinalizeGameMilharCentenaScreen from './screens/FinalizeGameMilharCentenaScreen';
import CentenaInvertidaScreen from './screens/CentenaInvertidaScreen';
import PrizesCentenaInvertidaScreen from './screens/PrizesCentenaInvertidaScreen';
import FinalizeCentenaInvertidaScreen from './screens/FinalizeCentenaInvertidaScreen';
import MilharInvertidaScreen from './screens/MilharInvertidaScreen';
import PrizesMilharInvertidaScreen from './screens/PrizesMilharInvertidaScreen';
import FinalizeMilharInvertidaScreen from './screens/FinalizeMilharInvertidaScreen';
import MilharECentenaInvertidaScreen from './screens/MilharECentenaInvertidaScreen';
import PrizesMilharECentenaInvertidaScreen from './screens/PrizesMilharECentenaInvertidaScreen';
import FinalizeMilharECentenaInvertidaScreen from './screens/FinalizeMilharECentenaInvertidaScreen';
import DezenaScreen from './screens/DezenaScreen';
import PrizesDezenaScreen from './screens/PrizesDezenaScreen';
import FinalizeDezenaScreen from './screens/FinalizeDezenaScreen';
import DuqueDeDezenaScreen from './screens/DuqueDeDezenaScreen';
import PrizesDuqueDeDezenaScreen from './screens/PrizesDuqueDeDezenaScreen';
import FinalizeDuqueDeDezenaScreen from './screens/FinalizeDuqueDeDezenaScreen';
import FinalizeTernoDeDezenaScreen from './screens/FinalizeTernoDeDezenaScreen';
import TernoDeDezenaScreen from './screens/TernoDeDezenaScreen';
import PrizesTernoDeDezenaScreen from './screens/PrizesTernoDeDezenaScreen';
import MilharDezenaScreen from './screens/MilharDezenaScreen';
import PrizesMilharDezenaScreen from './screens/PrizesMilharDezenaScreen';
import FinalizeGameMilharDezenaScreen from './screens/FinalizeGameMilharDezenaScreen';
import MilharCentenaDezenaScreen from './screens/MilharCentenaDezenaScreen';
import PrizesMilharCentenaDezenaScreen from './screens/PrizesMilharCentenaDezenaScreen';
import FinalizeGameMilharCentenaDezenaScreen from './screens/FinalizeGameMilharCentenaDezenaScreen';
import CentenaDezenaScreen from './screens/CentenaDezenaScreen';
import PrizesCentenaDezenaScreen from './screens/PrizesCentenaDezenaScreen';
import FinalizeCentenaDezenaScreen from './screens/FinalizeCentenaDezenaScreen';
import GrupoScreen from './screens/GrupoScreen';
import PrizesGrupoScreen from './screens/PrizesGrupoScreen';
import FinalizeGrupoScreen from './screens/FinalizeGrupoScreen';
import DuqueDeGrupoScreen from './screens/DuqueDeGrupoScreen';
import PrizesDuqueDeGrupoScreen from './screens/PrizesDuqueDeGrupoScreen';
import FinalizeDuqueDeGrupoScreen from './screens/FinalizeDuqueDeGrupoScreen';
import TernoDeGrupoScreen from './screens/TernoDeGrupoScreen';
import PrizesTernoDeGrupoScreen from './screens/PrizesTernoDeGrupoScreen';
import FinalizeTernoDeGrupoScreen from './screens/FinalizeTernoDeGrupoScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainMenu" component={MainMenuScreen} />
          <Stack.Screen name="Games" component={GamesScreen} />
          <Stack.Screen name="Milhar" component={MilharScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="PrizesMilharScreen" component={PrizesMilharScreen} />
          <Stack.Screen name="FinalizeGameMilharScreen" component={FinalizeGameMilharScreen} />
          <Stack.Screen name="Centena" component={CentenaScreen} />
          <Stack.Screen name="PrizesCentenaScreen" component={PrizesCentenaScreen} />
          <Stack.Screen name="FinalizeCentenaScreen" component={FinalizeCentenaScreen} />
          <Stack.Screen name="MilharCentena" component={MilharCentenaScreen} />
          <Stack.Screen name="PrizesMilharCentenaScreen" component={PrizesMilharCentenaScreen} />
          <Stack.Screen name="FinalizeGameMilharCentenaScreen" component={FinalizeGameMilharCentenaScreen} />
          <Stack.Screen name="CentenaInvertidaScreen" component={CentenaInvertidaScreen} />
          <Stack.Screen name="PrizesCentenaInvertidaScreen" component={PrizesCentenaInvertidaScreen} />
          <Stack.Screen name="FinalizeCentenaInvertidaScreen" component={FinalizeCentenaInvertidaScreen} />
          <Stack.Screen name="MilharInvertidaScreen" component={MilharInvertidaScreen} />
          <Stack.Screen name="PrizesMilharInvertidaScreen" component={PrizesMilharInvertidaScreen} />
          <Stack.Screen name="FinalizeMilharInvertidaScreen" component={FinalizeMilharInvertidaScreen} />
          <Stack.Screen name="MilharECentenaInvertidaScreen" component={MilharECentenaInvertidaScreen} />
          <Stack.Screen name="PrizesMilharECentenaInvertidaScreen" component={PrizesMilharECentenaInvertidaScreen} />
          <Stack.Screen name="FinalizeMilharECentenaInvertidaScreen" component={FinalizeMilharECentenaInvertidaScreen} />
          <Stack.Screen name="DezenaScreen" component={DezenaScreen} />
          <Stack.Screen name="PrizesDezenaScreen" component={PrizesDezenaScreen} />
          <Stack.Screen name="FinalizeDezenaScreen" component={FinalizeDezenaScreen} />
          <Stack.Screen name="DuqueDeDezenaScreen" component={DuqueDeDezenaScreen} />
          <Stack.Screen name="PrizesDuqueDeDezenaScreen" component={PrizesDuqueDeDezenaScreen} />
          <Stack.Screen name="FinalizeDuqueDeDezenaScreen" component={FinalizeDuqueDeDezenaScreen} />
          <Stack.Screen name="TernoDeDezenaScreen" component={TernoDeDezenaScreen} />
          <Stack.Screen name="PrizesTernoDeDezenaScreen" component={PrizesTernoDeDezenaScreen} />
          <Stack.Screen name="FinalizeTernoDeDezenaScreen" component={FinalizeTernoDeDezenaScreen} />
          <Stack.Screen name="MilharDezenaScreen" component={MilharDezenaScreen} />
          <Stack.Screen name="PrizesMilharDezenaScreen" component={PrizesMilharDezenaScreen} />
          <Stack.Screen name="FinalizeGameMilharDezenaScreen" component={FinalizeGameMilharDezenaScreen} />
          <Stack.Screen name="MilharCentenaDezenaScreen" component={MilharCentenaDezenaScreen} />
          <Stack.Screen name="PrizesMilharCentenaDezenaScreen" component={PrizesMilharCentenaDezenaScreen} />
          <Stack.Screen name="FinalizeGameMilharCentenaDezenaScreen" component={FinalizeGameMilharCentenaDezenaScreen} />
          <Stack.Screen name="CentenaDezenaScreen" component={CentenaDezenaScreen} />
          <Stack.Screen name="PrizesCentenaDezenaScreen" component={PrizesCentenaDezenaScreen} />
          <Stack.Screen name="FinalizeCentenaDezenaScreen" component={FinalizeCentenaDezenaScreen} />
          <Stack.Screen name="GrupoScreen" component={GrupoScreen} />
          <Stack.Screen name="PrizesGrupoScreen" component={PrizesGrupoScreen} />
          <Stack.Screen name="FinalizeGrupoScreen" component={FinalizeGrupoScreen} />
          <Stack.Screen name="DuqueDeGrupoScreen" component={DuqueDeGrupoScreen} />
          <Stack.Screen name="PrizesDuqueDeGrupoScreen" component={PrizesDuqueDeGrupoScreen} />
          <Stack.Screen name="FinalizeDuqueDeGrupoScreen" component={FinalizeDuqueDeGrupoScreen} />
          <Stack.Screen name="TernoDeGrupoScreen" component={TernoDeGrupoScreen} />
          <Stack.Screen name="PrizesTernoDeGrupoScreen" component={PrizesTernoDeGrupoScreen} />
          <Stack.Screen name="FinalizeTernoDeGrupoScreen" component={FinalizeTernoDeGrupoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
