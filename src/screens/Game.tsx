/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { styles } from "../styles"; // Import common styles
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../types/routes.type";
import { GAMES } from "../constants/GAMES";
import OTPInput from "../components/OTPInput";
import { Button } from "native-base";

type Props = NativeStackScreenProps<RootStackParamList, "Game">;

export const Game = ({ navigation, route }: Props) => {
  const { type } = route.params;

  const TYPE_GAME = GAMES[type];

  const [number, setNumber] = useState<string>("");
  const [numbers, setNumbers] = useState<string[]>([]);

  const addNumber = (num: string) => {
    setNumbers([...numbers, num]);
    setNumber("");
  };

  const deleteNumber = (index: number) => {
    setNumbers(numbers.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (numbers.length === 0) {
      Alert.alert(
        "Erro",
        "Adicione pelo menos um número no formato " + TYPE_GAME.format
      );
    } else {
      navigation.navigate("Prizes", { numbers, type });
    }
  };

  const handleInputChange = (text: string) => {
    setNumber(text);
    if (text.length === TYPE_GAME.format.length) {
      addNumber(text);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.title}>
        Digite um número no formato {TYPE_GAME.format}:
      </Text>
      <OTPInput
        code={number}
        format={TYPE_GAME.format}
        setCode={handleInputChange}
      />
      <FlatList
        style={{ flex: 1, marginVertical: 30 }}
        data={numbers}
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
      <Button onPress={handleNext}>
        <Text style={styles.actionButtonText}>Próximo</Text>
      </Button>
    </View>
  );
};

const localStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  numberItem: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginBottom: 7,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ececec",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  numberText: {
    fontSize: 25,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
  },
});
