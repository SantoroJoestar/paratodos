import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  TextInput,
  ListRenderItem,
} from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { GAMES } from "../constants/GAMES";
import { Button } from "native-base";
import { useCart } from "../providers/CartContext";
import { GameModel } from "../models/GameModel";

import { RootStackParamList } from "../types/routes.type";
import { formatarNumeros } from "../utils/generateChaves";
import { TitleBack } from "../components/TitleBack";
import { LoadingScreen } from "./LoadingScreen";

type Props = NativeStackScreenProps<RootStackParamList, "Game">;

export default memo(({ navigation, route }: Props) => {
  const { currentGame, setCurrentGame, cart, chaveValendo } = useCart();

  const { type } = route?.params;

  if (!type) return <LoadingScreen />;

  const [number, setNumber] = useState<string>("");

  // Memoriza o tipo de jogo e limite para evitar re-cálculo nas renderizações
  const TYPE_GAME = useMemo(() => GAMES[type], [type]);
  // Função para formatar o input conforme o formato definido no jogo
  const formatInput = useCallback(
    (input: string) => {
      let formattedInput = "";
      let inputIndex = 0;

      for (let i = 0; i < TYPE_GAME.format.length; i++) {
        if (TYPE_GAME.format[i] === "-") {
          formattedInput += "-";
        } else {
          if (input[inputIndex]) {
            formattedInput += input[inputIndex];
            inputIndex++;
          } else {
            break; // Se o input acabou, paramos de adicionar novos caracteres
          }
        }
      }

      return formattedInput;
    },
    [TYPE_GAME.format]
  );

  // Função para adicionar números formatados
  const handleInputChange = useCallback(
    (input: string) => {
      // Remove qualquer caractere que não seja número
      const numericInput = input.replace(/\D/g, "");

      // Verifica se o usuário está apagando caracteres
      const isDeleting = input.length < number.length;

      // Aplica o formato correto
      let formatted = formatInput(numericInput);

      if (isDeleting && formatted.endsWith("-")) {
        // Caso o último caractere seja um "-", remova-o
        formatted = formatted.slice(0, -1);
      }

      setNumber(formatted);

      // Verifica se o input está completo
      if (!isDeleting && formatted.length === TYPE_GAME.format.length) {
        if (TYPE_GAME.max > 0) {
          const formattedSplit = formatted.split("-");
          for (const form of formattedSplit) {
            if (Number(form) > TYPE_GAME.max) {
              Alert.alert(
                "Número nao pode ser maior que " + TYPE_GAME.max + "!"
              );
              return;
            }
          }
        }

        setCurrentGame((prev) => ({
          ...prev,
          numbers: [...prev.numbers, formatted],
        }));
        setNumber(""); // Reseta o input
      }
    },
    [formatInput, number, TYPE_GAME.format]
  );

  const deleteNumber = useCallback(
    (index: number) => {
      setCurrentGame((prev) => ({
        ...prev,
        numbers: prev.numbers.filter((_, i) => i !== index),
      }));
    },
    [setCurrentGame]
  );

  const handleNext = () => {
    if (currentGame.numbers.length === 0) {
      Alert.alert(
        "Erro",
        "Adicione pelo menos um número no formato " + TYPE_GAME.format
      );
    } else {
      navigation.replace("Prizes", {
        pule: cart.pule,
      });
    }
  };
  // Função para mostrar itens na lista
  const showItem = useCallback<ListRenderItem<string>>(
    ({ item, index }) => (
      <View style={localStyles.numberItem}>
        <Text style={localStyles.numberText}>{item}</Text>
        <Button colorScheme={"red"} onPress={() => deleteNumber(index)}>
          Apagar
        </Button>
      </View>
    ),
    [deleteNumber]
  );

  // Inicializa o jogo e gera um pule ao montar o componente
  useEffect(() => {
    setCurrentGame(
      GameModel({
        _id: TYPE_GAME.id,
      })
    );

    const generateNumbers = () => {
      const newNumbers: string[] = [];
      cart.games.forEach((game) => {
        game.numbers.forEach((number) => {
          if (TYPE_GAME.id === "dezena") {
            const nums = number.split("-");
            for (const num of nums) {
              if (num.length < TYPE_GAME.format.length) continue;
              const n = formatarNumeros(num, TYPE_GAME.format);
              newNumbers.push(n);
            }
            return;
          }
          const num = number.replaceAll("-", "");
          if (num.length < TYPE_GAME.format.replaceAll("-", "").length) return;
          const n = formatarNumeros(num, TYPE_GAME.format);
          newNumbers.push(n);
        });
      });

      const uniqueCombinations = new Set(newNumbers);

      const nums = Array.from(uniqueCombinations);

      setCurrentGame((prev) => ({
        ...prev,
        numbers: nums,
      }));
    };

    if (chaveValendo && !TYPE_GAME.max) generateNumbers();
  }, [TYPE_GAME, setCurrentGame]);

  return (
    <View style={{ flex: 1 }}>
      <TitleBack
        navigation={navigation}
        route={route}
        title={TYPE_GAME.label}
      />
      <View style={{ flex: 1, padding: 20 }}>
        <TextInput
          style={{
            fontSize: 20,
            fontWeight: "600",
            textAlign: "center",
            borderWidth: 1,
            borderColor: "blue",
            borderRadius: 7,
            paddingHorizontal: 20,
            backgroundColor: "white",
            paddingVertical: 6,
            color: "black",
          }}
          value={number}
          keyboardType="numeric"
          onChangeText={handleInputChange}
          maxLength={TYPE_GAME.format.length} // Define o máximo baseado no formato
          placeholder={TYPE_GAME.format} // Exibe o formato como placeholder
        />

        <FlatList
          style={{ flex: 1, marginVertical: 20 }}
          data={currentGame.numbers}
          renderItem={showItem}
          keyExtractor={(item, index) => index.toString()}
          extraData={currentGame.numbers}
        />

        {/* Grade de botões numéricos */}

        <Button onPress={handleNext} bg="blue.700">
          Confirmar
        </Button>
      </View>
    </View>
  );
});

const localStyles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  gameButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "32%",
    aspectRatio: 1,
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
    color: "black",
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
  },
  nextButton: {
    marginTop: 20,
  },
});
