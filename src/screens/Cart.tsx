/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ListRenderItem,
} from "react-native";

import { styles } from "../styles"; // Importe os estilos comuns
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../types/routes.type";

import { Button } from "native-base";

import { useCart } from "../providers/CartContext";
import { calculateAmount } from "../utils/calculateAmount";
import { numbersSelectedFormated } from "../utils/numbersSelectedFormated";
import { format } from "date-fns";
import { calculateAmountGame } from "../utils/calculateAmountGame";
import { print } from "../utils/print";
import { generatePule } from "../utils/generatePule";
import { GAMES } from "../constants/GAMES";

import { useSettings } from "../providers/SettingsContext";
import { GameType } from "../types/game.type";
import { formatterBRL } from "../utils/formatCurrency";

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

export default ({ route, navigation }: Props) => {
  const { cart, removeFromCart } = useCart();
  const { setShowChave, setChaveValendo } = useSettings();

  const confirmBets = async () => {
    // Verificar se há pelo menos uma aposta selecionada
    if (cart.games.length === 0) {
      Alert.alert(
        "Erro",
        "Você deve fazer pelo menos uma aposta para prosseguir."
      );
      return;
    }

    navigation.navigate("ConfirmGame");
    // Navegar para a próxima tela ou realizar outras ações necessárias
  };

  useEffect(() => {
    if (cart.games.length === 0) {
      setShowChave(false);
      setChaveValendo(false);
      navigation.replace("MenuGames");
    }
  }, [cart.games]);

  const showItem: ListRenderItem<GameType> = ({ item, index }) => (
    <View style={localStyles.betSummary}>
      <Text style={localStyles.summaryText}>{GAMES[item._id].label}</Text>

      <Text style={localStyles.summaryText}>{item.numbers.join(", ")}</Text>

      <Text style={localStyles.summaryText}>
        Apostas:{" "}
        {item.bets.map(
          (bet) =>
            formatterBRL(Number(bet.valueBet)) +
            " (Premios: " +
            numbersSelectedFormated(bet.prizes) +
            "), " +
            "\n"
        )}
      </Text>

      <Text style={localStyles.summaryText}>
        Valor: {formatterBRL(calculateAmount(item.bets))}
      </Text>

      <Button bg={"red.500"} mt={2} onPress={() => removeFromCart(index)}>
        Remover
      </Button>
    </View>
  );

  return (
    <View style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 20,
            color: "black",
          }}
        >
          Pule: {cart.pule}
        </Text>
        <FlatList
          style={{ flex: 1 }}
          data={cart.games}
          renderItem={showItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <Text style={localStyles.totalText}>
          Valor Total das Apostas:
          {formatterBRL(calculateAmountGame(cart.games))}
        </Text>
      </View>
      <Button
        bg={"blue.700"}
        onPress={() => {
          setShowChave(true);
          navigation.navigate("MenuGames");
        }}
      >
        Fazer mais Apostas
      </Button>
      <Button mt={2} onPress={confirmBets} bg="green.600">
        Confirmar
      </Button>
    </View>
  );
};

const localStyles = StyleSheet.create({
  datePickerButton: {
    backgroundColor: "#6c63ff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  datePickerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  timeButton: {
    backgroundColor: "#ccc",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedTimeButton: {
    backgroundColor: "#6c63ff",
  },
  timeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  summaryContainer: {
    flex: 1,
    marginVertical: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  betSummary: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
  },
  summaryText: {
    fontSize: 17,
    margin: 1,
    color: "black",
  },
  totalText: {
    marginTop: 7,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
