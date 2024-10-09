/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../styles";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../types/routes.type";

import { numbersSelectedFormated } from "../utils/numbersSelectedFormated";
import {
  Actionsheet,
  Button,
  Heading,
  HStack,
  Spinner,
  useDisclose,
} from "native-base";
import { add, format, setHours, setMinutes, setSeconds } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useCart } from "../providers/CartContext";
import { print } from "../utils/print";
import { GAMES } from "../constants/GAMES";
import { calculateAmountGame } from "../utils/calculateAmountGame";
import { useAuth } from "../providers/AuthContext";
import { getAllCombinations } from "../utils/getAllCombinations";
import { api } from "../services/api";
import { clone } from "../utils/clone";
import { formatterBRL } from "../utils/formatCurrency";
import { TitleBack } from "../components/TitleBack";

type Props = NativeStackScreenProps<RootStackParamList, "ConfirmGame">;

const HourTimesInitial = {
  "13": false,
  "16": false,
  "19": false,
};

export default ({ route, navigation }: Props) => {
  const { cart, newCart, setCart } = useCart();
  const { user } = useAuth();

  const dateNow = useMemo(() => new Date(), []);

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(dateNow);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState(HourTimesInitial);

  const { isOpen, onOpen, onClose } = useDisclose();

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setCart((prev) => ({ ...prev, dateBet: currentDate }));
  };

  const toggleTime = useCallback(
    (time: keyof typeof selectedTimes) => {
      const updatedTimes = Object.keys(selectedTimes).reduce((acc, cur) => {
        acc[cur as keyof typeof selectedTimes] = cur === time;
        return acc;
      }, {} as typeof selectedTimes);

      setSelectedTimes(updatedTimes);
      setCart((prev) => ({
        ...prev,
        time: Object.entries(updatedTimes)?.find((time) => time[1])?.[0] || "",
      }));
    },
    [setCart, selectedTimes]
  );

  const confirmBets = useCallback(async () => {
    if (loading) return;

    if (cart.time === "") {
      Alert.alert("Erro", "Você deve escolher um horário.");
      return;
    }

    if (!user) {
      Alert.alert("Erro", "Cambista não informado!");
      return;
    }

    setLoading(true);

    let cartObj = clone(cart);

    try {
      for (let index = 0; index < cartObj.games.length; index++) {
        let game = cartObj.games[index];

        if (
          game._id === "milhar_invertida" ||
          game._id === "centena_invertida" ||
          game._id === "milhar_centena_invertida"
        ) {
          const nums = game.numbers;
          const result = [];

          for (const num of nums) {
            const n = getAllCombinations(num);
            result.push(...n);
          }

          game = { ...game, numbers: clone(result) };
          cartObj.games[index] = game;
        }
      }

      const gamePost = {
        game: {
          pule: cartObj.pule,
          gameValues: cartObj.games.map((game) => ({
            gameName: game._id,
            numbers: game.numbers,
            prizes: game.bets.map((prize) => ({
              prizesValues: prize.prizes,
              bet: prize.valueBet,
            })),
          })),
          dateBet: cartObj.dateBet,
          dateCreated: cartObj.dateCreated,
          timeBet: cartObj.time,
        },
      };

      onOpen();
      const game = await api.post("/gameRegister", gamePost);

      if (game?.data?.games?._id) {
        await print(cart, user);
      } else {
        throw new Error("Erro ao fazer aposta!");
      }

      newCart();
      navigation.replace("MenuGames");
    } catch (error: unknown) {
      Alert.alert(
        "Erro",
        (error as Error)?.message || "Erro ao confirmar as apostas."
      );
    } finally {
      setLoading(false);
      onClose();
    }
  }, [cart, newCart, user, onOpen, onClose, navigation, loading]);

  const timesChoose = Object.keys(selectedTimes)
    .sort((a, b) => (Number(a) < Number(b) ? -1 : 1))
    .filter((time) => {
      const addedTime = add(dateNow, { minutes: 30 });
      const selectedDateTime = setSeconds(
        setMinutes(setHours(date, Number(time)), 0),
        0
      );
      return addedTime < selectedDateTime;
    });

  return (
    <View style={{ flex: 1 }}>
      <TitleBack
        navigation={navigation}
        route={route}
        title={"Confirmar Jogo"}
      />

      <View style={styles.scrollContainer}>
        <Actionsheet isOpen={isOpen} hideDragIndicator>
          <Actionsheet.Content>
            <HStack space={2} py={10} justifyContent="center">
              <Spinner size={"lg"} />
              <Heading fontSize="2xl">Carregando...</Heading>
            </HStack>
          </Actionsheet.Content>
        </Actionsheet>
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
            <Text style={localStyles.noTimeText}>
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
                        formatterBRL(Number(bet.valueBet)) +
                        " (Prêmios: " +
                        numbersSelectedFormated(bet.prizes) +
                        "), " +
                        "\n"
                    )}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />

            <Text style={localStyles.totalText}>
              Valor Total das Apostas:
              {formatterBRL(calculateAmountGame(cart.games))}
            </Text>
          </View>
          <Button onPress={confirmBets} bg="blue.700">
            {loading ? "Carregando..." : "Confirmar"}
          </Button>
        </View>
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
  noTimeText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
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
    color: "black",
  },
  totalText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
