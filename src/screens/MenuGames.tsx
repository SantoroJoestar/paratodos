/* eslint-disable prettier/prettier */
import React, { useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { RootStackParamList } from "../types/routes.type";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { GAMES } from "../constants/GAMES";

import { BottomCart } from "../components/BottomCart";
import { Button, HStack, Switch } from "native-base";
import { useSettings } from "../providers/SettingsContext";
import { useCart } from "../providers/CartContext";

type Props = NativeStackScreenProps<RootStackParamList, "MenuGames">;

export const MenuGames = ({ navigation }: Props) => {
  const { chaveValendo, setChaveValendo, showChave } = useSettings();
  const { cart } = useCart();

  const navigateToGame = useCallback((screen: keyof typeof GAMES) => {
    navigation.navigate("Game", {
      type: screen,
      pule: cart.pule,
    });
  }, []);

  return (
    <BottomCart navigation={navigation}>
      <ScrollView contentContainerStyle={localStyles.scrollContainer}>
        <View style={localStyles.container}>
          {showChave && (
            <HStack alignItems="center" space={4} mb={5}>
              <Text style={[localStyles.title, { marginBottom: 0 }]}>
                CHAVE VALENDO
              </Text>
              <Switch
                size="lg"
                value={chaveValendo}
                onValueChange={(newValue) => setChaveValendo(newValue)}
              />
            </HStack>
          )}
          <View style={localStyles.gridContainer}>
            {Object.entries(GAMES)
              .filter(([id, game]) => id !== "")
              .map(([_, game], index) => (
                <Button
                  bg={"blue.700"}
                  key={index}
                  style={localStyles.gameButton}
                  onPress={() => navigateToGame(game.id)}
                >
                  <Text style={localStyles.gameButtonText}>{game.label}</Text>
                </Button>
              ))}
          </View>
        </View>
      </ScrollView>
    </BottomCart>
  );
};

const localStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 10, // Ajuste para garantir espaço para o rodapé
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "black",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gameButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    width: "30%", // Mantém 3 botões por linha
    aspectRatio: 1, // Garantindo que os botões sejam quadrados
    height: 1,
  },
  gameButtonText: {
    color: "#fff",
    fontSize: 16, // Ajuste para acomodar títulos maiores
    fontWeight: "bold",
    textAlign: "center",
  },
  footerText: {
    marginTop: 20,
    textAlign: "center",
    color: "#888",
    fontSize: 14,
  },
});
