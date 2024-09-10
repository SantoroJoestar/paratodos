/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";

import { styles } from "../styles"; // Importe os estilos comuns
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../types/routes.type";
import { MaskedText } from "react-native-mask-text";

import { Button } from "native-base";

import { useCart } from "../providers/CartContext";
import { calculateAmount } from "../utils/calculateAmount";
import { numbersSelectedFormated } from "../utils/numbersSelectedFormated";
import { format } from "date-fns";
import { calculateAmountGame } from "../utils/calculateAmountGame";
import { print } from "../utils/print";

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

export const Cart = ({ route, navigation }: Props) => {
  const { items, removeFromCart } = useCart();

  const confirmBets = async () => {
    // Verificar se há pelo menos uma aposta selecionada
    if (items.length === 0) {
      Alert.alert(
        "Erro",
        "Você deve fazer pelo menos uma aposta para prosseguir."
      );
      return;
    }

    Alert.alert("Imprimindo nota...");

    await print(items);

    // Aqui você pode adicionar a lógica para confirmar as apostas
    Alert.alert("Apostas confirmadas!");
    navigation.navigate("MainMenu");
    // Navegar para a próxima tela ou realizar outras ações necessárias
  };

  return (
    <View style={styles.scrollContainer}>
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={items}
          renderItem={({ item, index }) => (
            <View style={localStyles.betSummary}>
              <Text style={localStyles.summaryText}>Pule: {item.pule}</Text>

              <Text style={localStyles.summaryText}>Jogo: {item.name}</Text>

              <Text style={localStyles.summaryText}>
                Data e Horário: {format(item.date, "dd/MM/yyyy HH:mm")}
              </Text>

              <Text style={localStyles.summaryText}>
                Números: {item.numbers.join(", ")}
              </Text>

              <Text style={localStyles.summaryText}>
                Apostas:{" "}
                {item.bets.map(
                  (bet) =>
                    "R$ " +
                    bet.valueBet +
                    " (Premios: " +
                    numbersSelectedFormated(bet.prizes) +
                    "), " +
                    "\n"
                )}
              </Text>

              <Text style={localStyles.summaryText}>
                Valor:{" "}
                <MaskedText
                  type="currency"
                  options={{
                    prefix: "R$ ",
                    decimalSeparator: ",",
                    groupSeparator: ".",
                    precision: 2,
                  }}
                >
                  {calculateAmount(item.bets)}
                </MaskedText>
              </Text>

              <Button
                variant="outline"
                mt={2}
                onPress={() => removeFromCart(index)}
              >
                Remover
              </Button>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <Text style={localStyles.totalText}>
          Valor Total das Apostas:{" "}
          <MaskedText
            type="currency"
            options={{
              prefix: "R$ ",
              decimalSeparator: ",",
              groupSeparator: ".",
              precision: 2,
            }}
          >
            {calculateAmountGame(items)}
          </MaskedText>
        </Text>
      </View>
      <Button
        variant={"outline"}
        onPress={() => navigation.navigate("MenuGames")}
      >
        Fazer mais Apostas
      </Button>
      <Button mt={2} onPress={confirmBets}>
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
  },
  totalText: {
    marginTop: 7,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
