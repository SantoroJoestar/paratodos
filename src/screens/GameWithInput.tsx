import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { compareArrays } from "../utils/compareArrays";
import { RootStackParamList } from "../types/routes.type";

type Props = NativeStackScreenProps<RootStackParamList, "Game">;

export const GameWithInput = ({ navigation, route }: Props) => {
  const { type } = route.params;
  const { currentGame, setCurrentGame, cart } = useCart();

  const [currentGameThis, setCurrentGameThis] = useState(currentGame);
  const [number, setNumber] = useState<string>("");

  // Memoriza o tipo de jogo e limite para evitar re-cálculo nas renderizações
  const TYPE_GAME = useMemo(() => GAMES[type], [type]);
  const limit = useMemo(() => TYPE_GAME.max, [TYPE_GAME]);

  // Inicializa o jogo e gera um pule ao montar o componente
  useEffect(() => {
    setCurrentGameThis(
      GameModel({
        _id: TYPE_GAME.id,
      })
    );
  }, [TYPE_GAME, setCurrentGameThis]);

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

      // Aplica o formato correto
      const formatted = formatInput(numericInput);
      setNumber(formatted);

      // Verifica se o input está completo
      if (formatted.length === TYPE_GAME.format.length) {
        setCurrentGameThis((prev) => ({
          ...prev,
          numbers: [...prev.numbers, formatted],
        }));
        setNumber(""); // Reseta o input
      }
    },
    [formatInput, TYPE_GAME.format]
  );

  const deleteNumber = useCallback(
    (index: number) => {
      setCurrentGameThis((prev) => ({
        ...prev,
        numbers: prev.numbers.filter((_, i) => i !== index),
      }));
    },
    [setCurrentGameThis]
  );

  const handleNext = useCallback(() => {
    if (currentGameThis.numbers.length === 0) {
      Alert.alert(
        "Erro",
        "Adicione pelo menos um número no formato " + TYPE_GAME.format
      );
    } else {
      if (
        cart.games.length > 0 &&
        compareArrays(
          currentGameThis.numbers,
          cart.games[cart.games.length - 1].numbers
        )
      ) {
        navigation.navigate("Cart");
      } else {
        setCurrentGame(currentGameThis);
        navigation.navigate("Prizes", {
          pule: cart.pule,
        });
      }
    }
  }, [currentGameThis.numbers, navigation, TYPE_GAME.format, cart.games]);

  // Função para mostrar itens na lista
  const showItem = useCallback<ListRenderItem<string>>(
    ({ item, index }) => (
      <View style={localStyles.numberItem}>
        <Text style={localStyles.numberText}>{item}</Text>
        <TouchableOpacity onPress={() => deleteNumber(index)}>
          <Text style={localStyles.deleteButton}>Apagar</Text>
        </TouchableOpacity>
      </View>
    ),
    [deleteNumber]
  );

  console.log("atualizou game");

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Substitui o OTPInput por TextInput */}
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
        data={currentGameThis.numbers}
        renderItem={showItem}
        keyExtractor={(item, index) => index.toString()}
        extraData={currentGameThis.numbers}
      />

      {/* Grade de botões numéricos */}

      <Button onPress={handleNext} bg="blue.700">
        Confirmar
      </Button>
    </View>
  );
};

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
