/* eslint-disable prettier/prettier */
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { styles } from "../styles"; // Importe os estilos comuns
import { RootStackParamList } from "../types/routes.type";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { GAMES } from "../constants/GAMES";
import { GameModel } from "../models/GameModel";
import { useCart } from "../providers/CartContext";

type Props = NativeStackScreenProps<RootStackParamList, "MenuGames">;

export const MenuGames = ({ navigation }: Props) => {
  const { setCurrentGame } = useCart();

  const navigateToGame = (screen: keyof typeof GAMES) => {
    setCurrentGame(GameModel());
    navigation.navigate("Game", {
      type: screen,
    });
  };

  return (
    <ScrollView contentContainerStyle={localStyles.scrollContainer}>
      <View style={localStyles.container}>
        <Text style={localStyles.title}>Escolha seu Jogo</Text>
        <View style={localStyles.gridContainer}>
          {Object.entries(GAMES).map(([_, game], index) => (
            <TouchableOpacity
              key={index}
              style={localStyles.gameButton}
              onPress={() => navigateToGame(game.id)}
            >
              <Text style={localStyles.gameButtonText}>{game.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={localStyles.footerText}>
          Desenvolvido por Evolved World
        </Text>
      </View>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 50, // Ajuste para garantir espaço para o rodapé
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gameButton: {
    backgroundColor: "#6c63ff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    width: "30%", // Mantém 3 botões por linha
    aspectRatio: 1, // Garantindo que os botões sejam quadrados
    padding: 10, // Espaçamento interno ajustado
  },
  gameButtonText: {
    color: "#fff",
    fontSize: 14, // Ajuste para acomodar títulos maiores
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
