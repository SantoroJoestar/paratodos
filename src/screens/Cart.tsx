/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";

import { styles } from "../styles"; // Importe os estilos comuns
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../types/routes.type";
import { MaskedText } from "react-native-mask-text";
import { numbersSelectedFormated } from "../utils/numbersSelectedFormated";
import { Button } from "native-base";

import { useCart } from "../providers/CartContext";

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

const HourTimesInitial = {
  "14h": false,
  "19h": false,
};

export const Cart = ({ route, navigation }: Props) => {
  console.log("route.params: ", route.params);

  const { items } = useCart();

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
    if (items.length === 0) {
      Alert.alert(
        "Erro",
        "Você deve fazer pelo menos uma aposta para prosseguir."
      );
      return;
    }

    // Aqui você pode adicionar a lógica para confirmar as apostas
    Alert.alert("Apostas confirmadas");
    navigation.navigate("MainMenu");
    // Navegar para a próxima tela ou realizar outras ações necessárias
  };

  return (
    <View style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Carrinho</Text>

        <FlatList
          style={{ flex: 1 }}
          data={items}
          renderItem={({ item, index }) => (
            <View style={localStyles.betSummary}>
              <Text style={localStyles.summaryText}>Números: {index}</Text>
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
                  {item.betAmount}
                </MaskedText>
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* Campo para mostrar o valor total das apostas */}
        <Text style={localStyles.totalText}>
          Subtotal das Apostas:{" "}
          <MaskedText
            type="currency"
            options={{
              prefix: "R$ ",
              decimalSeparator: ",",
              groupSeparator: ".",
              precision: 2,
            }}
          >
            20000
          </MaskedText>
        </Text>
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
            20000
          </MaskedText>
        </Text>
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
            20000
          </MaskedText>
        </Text>
      </View>
      <Button onPress={confirmBets}>
        <Text style={styles.actionButtonText}>Confirmar</Text>
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
    fontSize: 20,
    margin: 5,
  },
  totalText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
