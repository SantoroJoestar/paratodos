/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../styles"; // Importe os estilos comuns
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../types/routes.type";
import { MaskedText } from "react-native-mask-text";
import { numbersSelectedFormated } from "../utils/numbersSelectedFormated";
import { Button } from "native-base";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useCart } from "../providers/CartContext";

import { calculateAmount } from "../utils/calculateAmount";

type Props = NativeStackScreenProps<RootStackParamList, "ConfirmGame">;

const HourTimesInitial = {
  "14h": false,
  "19h": false,
};

export const ConfirmGame = ({ navigation }: Props) => {
  const { setItems, currentGame, setCurrentGame } = useCart();

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState(HourTimesInitial);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const toggleTime = (time: keyof typeof HourTimesInitial) => {
    setSelectedTimes({
      ...selectedTimes,
      [time]: !selectedTimes[time],
    });
  };

  const confirmBets = () => {
    // Verificar se há pelo menos uma aposta selecionada
    if (currentGame.bets.length === 0) {
      Alert.alert(
        "Erro",
        "Você deve fazer pelo menos uma aposta para prosseguir."
      );
      return;
    }

    setCurrentGame((prev) => ({ ...prev, date: date, time: "14h" }));

    setItems((prev) => [...prev, currentGame]);

    navigation.navigate("Cart");
    // Navegar para a próxima tela ou realizar outras ações necessárias
  };

  return (
    <View style={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={localStyles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={localStyles.datePickerButtonText}>
            {format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="calendar"
            onChange={onChange}
            timeZoneName="America/Sao_Paulo"
          />
        )}
        <View style={localStyles.timeContainer}>
          {Object.keys(HourTimesInitial).map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                localStyles.timeButton,
                selectedTimes[time as keyof typeof HourTimesInitial] &&
                  localStyles.selectedTimeButton,
              ]}
              onPress={() => toggleTime(time as keyof typeof HourTimesInitial)}
            >
              <Text style={localStyles.timeButtonText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={localStyles.summaryContainer}>
          <Text style={localStyles.summaryTitle}>Resumo das Apostas:</Text>

          <FlatList
            style={{ flex: 1 }}
            data={currentGame.bets}
            renderItem={({ item }) => (
              <View style={localStyles.betSummary}>
                <Text style={localStyles.summaryText}>
                  Números: {currentGame.numbers.join(", ")}
                </Text>
                <Text style={localStyles.summaryText}>
                  Prêmios: {numbersSelectedFormated(item.prizes)}
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
                    {item.valueBet}
                  </MaskedText>
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
              {calculateAmount(currentGame.bets)}
            </MaskedText>
          </Text>
        </View>
        <Button onPress={confirmBets}>
          <Text style={styles.actionButtonText}>Confirmar</Text>
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
