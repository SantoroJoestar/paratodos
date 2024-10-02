import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ListRenderItem,
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
import { GameModel } from "../models/GameModel";
import { compareArrays } from "../utils/compareArrays";

type Props = NativeStackScreenProps<RootStackParamList, "Game">;

export const Game = ({ navigation, route }: Props) => {
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

  // Usa o `useCallback` para evitar re-criação de funções em cada renderização
  const addNumber = useCallback(
    (num: string) => {
      setCurrentGameThis((prev) => ({
        ...prev,
        numbers: [...prev.numbers, num],
      }));
    },
    [setCurrentGameThis]
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

  const validateCode = useCallback(
    (inputCode: string) => {
      if (!limit) return true;

      const parts = inputCode.split("-");
      for (const part of parts) {
        const numericValue = parseInt(part);
        if (numericValue > limit) {
          Alert.alert("Erro", "Dezena nao pode ser maior que " + limit + "!");
          return false;
        }
      }
      return true;
    },
    [limit]
  );

  // Função otimizada para lidar com a mudança de input
  const handleInputChange = useCallback(
    (value: string) => {
      setNumber((prev) => {
        let newValue = prev;

        const nextCharIndex = prev.length;
        if (TYPE_GAME.format[nextCharIndex] === "-") {
          newValue = prev + "-" + value;
        } else {
          newValue = prev + value;
        }

        // Valida o código quando ele atingir o formato correto
        if (
          newValue.length === TYPE_GAME.format.length &&
          validateCode(newValue)
        ) {
          addNumber(newValue);
          return "";
        }

        return newValue;
      });
    },
    [TYPE_GAME.format, addNumber, validateCode]
  );

  const handleDeleteLast = useCallback(() => {
    setNumber((prev) => {
      const nextCharIndex = prev.length - 1;
      if (TYPE_GAME.format[nextCharIndex] === "-") {
        return prev.slice(0, -2);
      }
      return prev.slice(0, -1);
    });
  }, [TYPE_GAME.format]);

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

  const handleOk = useCallback(() => {
    handleNext();
  }, [handleNext]);

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
      <OTPInput code={number} format={TYPE_GAME.format} />

      <FlatList
        style={{ flex: 1, marginVertical: 20 }}
        data={currentGameThis.numbers}
        renderItem={showItem}
        keyExtractor={(item, index) => index.toString()}
        extraData={currentGameThis.numbers}
      />

      {/* Grade de botões numéricos */}
      <View style={localStyles.gridContainer}>
        <Button
          bg="blue.700"
          style={localStyles.gameButton}
          onPress={() => handleInputChange("1")}
        >
          <Text style={localStyles.buttonText}>1</Text>
        </Button>
        <Button
          bg="blue.700"
          style={localStyles.gameButton}
          onPress={() => handleInputChange("2")}
        >
          <Text style={localStyles.buttonText}>2</Text>
        </Button>
        <Button
          bg="blue.700"
          style={localStyles.gameButton}
          onPress={() => handleInputChange("3")}
        >
          <Text style={localStyles.buttonText}>3</Text>
        </Button>
        <Button
          bg="blue.700"
          style={localStyles.gameButton}
          onPress={() => handleInputChange("4")}
        >
          <Text style={localStyles.buttonText}>4</Text>
        </Button>
        <Button
          bg="blue.700"
          style={localStyles.gameButton}
          onPress={() => handleInputChange("5")}
        >
          <Text style={localStyles.buttonText}>5</Text>
        </Button>
        <Button
          bg="blue.700"
          style={localStyles.gameButton}
          onPress={() => handleInputChange("6")}
        >
          <Text style={localStyles.buttonText}>6</Text>
        </Button>
        <Button
          bg="blue.700"
          style={localStyles.gameButton}
          onPress={() => handleInputChange("7")}
        >
          <Text style={localStyles.buttonText}>7</Text>
        </Button>
        <Button
          bg="blue.700"
          style={localStyles.gameButton}
          onPress={() => handleInputChange("8")}
        >
          <Text style={localStyles.buttonText}>8</Text>
        </Button>
        <Button
          bg="blue.700"
          style={localStyles.gameButton}
          onPress={() => handleInputChange("9")}
        >
          <Text style={localStyles.buttonText}>9</Text>
        </Button>
        <Button
          bg="red.500"
          style={localStyles.gameButton}
          onPress={handleDeleteLast}
        >
          <Text style={localStyles.buttonText}>X</Text>
        </Button>
        <Button
          bg="blue.700"
          style={localStyles.gameButton}
          onPress={() => handleInputChange("0")}
        >
          <Text style={localStyles.buttonText}>0</Text>
        </Button>
        <Button
          bg="green.500"
          style={localStyles.gameButton}
          onPress={handleOk}
        >
          <Text style={localStyles.buttonText}>OK</Text>
        </Button>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: 210,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  gameButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
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
