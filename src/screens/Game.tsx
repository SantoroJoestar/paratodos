import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { GAMES } from "../constants/GAMES";
import OTPInput from "../components/OTPInput";
import { Button } from "native-base";
import { useCart } from "../providers/CartContext";
import { generatePule } from "../utils/generatePule";
import { formatarNumeros } from "../utils/generateChaves";
import { useSettings } from "../providers/SettingsContext";
import { RootStackParamList } from "../types/routes.type";
import { getAllCombinations } from "../utils/getAllCombinations";

type Props = NativeStackScreenProps<RootStackParamList, "Game">;

export const Game = ({ navigation, route }: Props) => {
  const { type } = route.params;
  const { currentGame, setCurrentGame, cart } = useCart();
  const { chaveValendo } = useSettings();

  const TYPE_GAME = GAMES[type];
  const limit = TYPE_GAME.max;

  const [number, setNumber] = useState<string>("");

  useEffect(() => {
    setCurrentGame((prev) => ({
      ...prev,
      _id: TYPE_GAME.id,
      pule: generatePule(),
    }));
  }, [TYPE_GAME]);

  const addNumber = (num: string) => {
    setCurrentGame((prev) => ({ ...prev, numbers: [...prev.numbers, num] }));
    setNumber("");
  };

  const deleteNumber = (index: number) => {
    setCurrentGame((prev) => ({
      ...prev,
      numbers: prev.numbers.filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => {
    if (currentGame.numbers.length === 0) {
      Alert.alert(
        "Erro",
        "Adicione pelo menos um número no formato " + TYPE_GAME.format
      );
    } else {
      navigation.navigate("Prizes");
    }
  };

  const validateCode = (inputCode: string) => {
    let bool = true;
    if (!limit) return true;

    const parts = inputCode.split("-");
    for (const part of parts) {
      const numericValue = parseInt(part);
      if (numericValue > limit) {
        bool = false; // Limite de 25
        Alert.alert("Erro", "Dezena nao pode ser maior que " + limit + "!");
        break;
      }
    }
    return bool;
  };

  const handleInputChange = (value: string) => {
    setNumber((prev) => {
      const nextCharIndex = prev.length;

      // Verifica se a posição do próximo caractere é um traço no formato
      if (TYPE_GAME.format[nextCharIndex] === "-") {
        return prev + "-" + value; // Adiciona traço seguido do número
      }

      return prev + value; // Adiciona o número normalmente
    });
  };

  useEffect(() => {
    if (number.length === TYPE_GAME.format.length && validateCode(number)) {
      if (TYPE_GAME.id === "milhar") {
        const permutas = getAllCombinations(number);
        for (const perm of permutas) {
          if (!currentGame.numbers.includes(perm)) addNumber(perm);
        }
      } else {
        addNumber(number);
      }
    }
  }, [number]);

  // Função para apagar o último número inserido
  const handleDeleteLast = () => {
    setNumber((prev) => {
      const nextCharIndex = prev.length - 1;

      // Verifica se a posição do próximo caractere é um traço no formato
      if (TYPE_GAME.format[nextCharIndex] === "-") {
        return prev.slice(0, -2); // Adiciona traço seguido do número
      }

      return prev.slice(0, -1); // Adiciona o número normalmente
    });
  };

  // Função do botão OK
  const handleOk = () => {
    handleNext();
  };

  useEffect(() => {
    const gerarNumeros = () => {
      const newNumbers: string[] = [];

      cart.games.forEach((game) => {
        game.numbers.forEach((number) => {
          if (TYPE_GAME.id === "dezena") {
            const nums = number.split("-");

            for (const num of nums) {
              if (num.length < TYPE_GAME.format.length) continue;

              const n = formatarNumeros(num, TYPE_GAME.format);

              if (newNumbers.includes(n) || currentGame.numbers.includes(n))
                continue;

              newNumbers.push(n);
            }

            return;
          }

          const num = number.replaceAll("-", "");

          if (num.length < TYPE_GAME.format.replaceAll("-", "").length) return;

          const n = formatarNumeros(num, TYPE_GAME.format);

          if (newNumbers.includes(n) || currentGame.numbers.includes(n)) return;

          newNumbers.push(n);
        });
      });

      setCurrentGame((prev) => ({
        ...prev,
        numbers: [...prev.numbers, ...newNumbers],
      }));
    };

    if (chaveValendo && !TYPE_GAME.max) gerarNumeros();
  }, [TYPE_GAME]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <OTPInput code={number} format={TYPE_GAME.format} />

      <FlatList
        style={{ flex: 1, marginVertical: 20 }}
        data={currentGame.numbers}
        renderItem={({ item, index }) => (
          <View style={localStyles.numberItem}>
            <Text style={localStyles.numberText}>{item}</Text>
            <TouchableOpacity onPress={() => deleteNumber(index)}>
              <Text style={localStyles.deleteButton}>Apagar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Grade de botões numéricos */}
      <View style={localStyles.gridContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "X", 0, "OK"].map((value, index) => (
          <Button
            key={index}
            bg={
              value === "X"
                ? "red.500"
                : value === "OK"
                ? "green.500"
                : "blue.700"
            }
            style={localStyles.gameButton}
            onPress={
              () =>
                value === "X"
                  ? handleDeleteLast() // Apaga o último número ao apertar "X"
                  : value === "OK"
                  ? handleOk() // Executa a mesma função do botão "Próximo"
                  : handleInputChange(value.toString()) // Adiciona o número normalmente
            }
          >
            <Text style={localStyles.buttonText}>{value}</Text>
          </Button>
        ))}
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: 210,
    justifyContent: "space-between", // Distribui os botões igualmente
    marginVertical: 10,
  },
  gameButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "32%", // Garante 3 botões por linha
    aspectRatio: 1, // Faz com que o botão seja quadrado
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  numberItem: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ececec",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  numberText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
  },
  nextButton: {
    marginTop: 20,
  },
});
