/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../styles"; // Importe os estilos comuns
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../types/routes.type";
import { MaskedText } from "react-native-mask-text";
import { numbersSelectedFormated } from "../utils/numbersSelectedFormated";
import { Button } from "native-base";
import { format, formatDistance, sub } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useCart } from "../providers/CartContext";

import { print } from "../utils/print";
import { GAMES } from "../constants/GAMES";
import { formatCurrency } from "../utils/formatCurrency";
import { calculateAmountGame } from "../utils/calculateAmountGame";
import { useAuth } from "../providers/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "ConfirmGame">;

const HourTimesInitial = {
  "13": false,
  "16": false,
  "19": false,
};

export const ConfirmGame = ({ navigation }: Props) => {
  const { cart, newCart, setCart } = useCart();
  const { user } = useAuth();

  const dateNow = new Date();

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState(HourTimesInitial);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setCart((prev) => ({ ...prev, dateBet: currentDate }));
  };

  // Lógica para permitir selecionar apenas um horário
  const toggleTime = (time: keyof typeof selectedTimes) => {
    // Atualizar o estado, desmarcando todos os outros tempos e marcando apenas o selecionado
    const updatedTimes = Object.keys(selectedTimes).reduce((acc, cur) => {
      acc[cur as keyof typeof selectedTimes] = cur === time;
      return acc;
    }, {} as typeof selectedTimes);

    setSelectedTimes(updatedTimes);
    setCart((prev) => ({
      ...prev,
      time: Object.entries(updatedTimes)?.find((time) => time[1])?.[0] || "",
    }));
  };

  const confirmBets = async () => {
    if (cart.time === "") {
      Alert.alert("Erro", "Você deve fazer escolher um horário.");
      return;
    }

    await print(cart, user);

    newCart();
    // Aqui você pode adicionar a lógica para confirmar as apostas
    navigation.navigate("MenuGames");
    // Navegar para a próxima tela ou realizar outras ações necessárias
  };

  const timesChoose = Object.keys(selectedTimes)
    .sort((a, b) => (Number(a) < Number(b) ? -1 : 1))
    .filter((time) => {
      const selectedDateTime = new Date(date); // Clona a data selecionada

      selectedDateTime.setHours(Number(time), 0, 0, 0); // Define a hora com base no botão

      return selectedDateTime > dateNow; // Filtra se a hora do botão for no futuro
    });

  return (
    <View style={styles.scrollContainer}>
      <View style={styles.container}>
        <Button bg={"blue.700"} onPress={() => setShowDatePicker(true)}>
          {format(date, "EEEE, dd 'de' MMM 'de' yyyy", { locale: ptBR })}
        </Button>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="calendar"
            onChange={onChange}
            timeZoneName="America/Sao_Paulo"
            minimumDate={dateNow}
          />
        )}
        <View style={localStyles.timeContainer}>
          {timesChoose.map((time) => (
            <Button
              key={time}
              bg={
                selectedTimes?.[time as keyof typeof selectedTimes]
                  ? "blue.700"
                  : "gray.400"
              }
              onPress={() => toggleTime(time as keyof typeof selectedTimes)}
            >
              <Text style={localStyles.timeButtonText}>{time}h</Text>
            </Button>
          ))}
        </View>
        {timesChoose.length === 0 && (
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Nenhum horário disponível para esta data
          </Text>
        )}
        <View style={localStyles.summaryContainer}>
          <Text style={localStyles.summaryTitle}>Apostas:</Text>

          <FlatList
            style={{ flex: 1 }}
            data={cart.games}
            renderItem={({ item }) => (
              <View style={localStyles.betSummary}>
                <Text style={localStyles.summaryText}>
                  {GAMES[item._id].label}
                </Text>

                <Text style={localStyles.summaryText}>
                  {item.numbers.join(", ")}
                </Text>

                <Text style={localStyles.summaryText}>
                  Apostas:{" "}
                  {item.bets.map(
                    (bet) =>
                      formatCurrency(Number(bet.valueBet)) +
                      " (Premios: " +
                      numbersSelectedFormated(bet.prizes) +
                      "), " +
                      "\n"
                  )}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />

          {/* Campo para mostrar o valor total das apostas */}
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
              {calculateAmountGame(cart.games)}
            </MaskedText>
          </Text>
        </View>
        <Button onPress={confirmBets} bg="blue.700">
          Confirmar
        </Button>
      </View>
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
    marginVertical: 5,
    marginTop: 20,
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
    paddingBottom: 0,
    borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
  },
  summaryText: {
    fontSize: 16,
    margin: 2,
  },
  totalText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
