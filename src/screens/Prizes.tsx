/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  TextInputProps,
  Platform,
} from "react-native";

import { styles } from "../styles"; // Import common styles
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../types/routes.type";
import { MaskedText, MaskedTextInput } from "react-native-mask-text";
import { Actionsheet, Button, useDisclose } from "native-base";

import { numbersSelectedFormated } from "../utils/numbersSelectedFormated";
import { border } from "native-base/lib/typescript/theme/styled-system";
import { BetType } from "../types/bet.type";
import { useCart } from "../providers/CartContext";

type Props = NativeStackScreenProps<RootStackParamList, "Prizes">;

export const Prizes = ({ navigation }: Props) => {
  const [selectedPrizes, setSelectedPrizes] = useState<string[]>([]);

  const [betAmount, setBetAmount] = useState("");

  const { currentGame, setCurrentGame } = useCart();

  const { isOpen, onOpen, onClose } = useDisclose();

  const handlePrizeSelection = (prizeNumber: string) => {
    if (selectedPrizes.includes(prizeNumber)) {
      setSelectedPrizes(selectedPrizes.filter((item) => item !== prizeNumber));
    } else {
      setSelectedPrizes([...selectedPrizes, prizeNumber]);
    }
  };

  const remove = (index: number) => {
    setSelectedPrizes((prev) => prev.filter((_, i) => i !== index));
    setCurrentGame((prev) => ({
      ...prev,
      bets: prev.bets.filter((_, i) => i !== index),
    }));
  };

  const handleConfirm = () => {
    if (selectedPrizes.length === 0) {
      Alert.alert("Erro", "Selecione pelo menos um prêmio.");
    } else if (!betAmount || !Number(betAmount)) {
      Alert.alert("Erro", "Informe o valor da aposta.");
    } else {
      const newBet: BetType = {
        valueBet: betAmount,
        prizes: selectedPrizes,
      };
      setCurrentGame((prev) => ({ ...prev, bets: [...prev.bets, newBet] }));
      setSelectedPrizes([]);
      setBetAmount("");
      onClose();
    }
  };

  const handleProceed = () => {
    if (currentGame.bets.length === 0) {
      Alert.alert("Erro", "Faça pelo menos uma aposta antes de prosseguir.");
    } else {
      navigation.navigate("ConfirmGame");
    }
  };

  return (
    <View style={styles.container}>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <View
            style={{ paddingHorizontal: 20, paddingTop: 30, width: "100%" }}
          >
            <Text style={localStyles.modalText}>
              Selecione os prêmios desejados:
            </Text>
            <View style={{ paddingVertical: 20 }}>
              <MaskedTextInput
                type="currency"
                options={{
                  prefix: "R$ ",
                  decimalSeparator: ",",
                  groupSeparator: ".",
                  precision: 2,
                }}
                value={betAmount}
                onChangeText={(text, textRaw) => {
                  setBetAmount(textRaw ? textRaw : "0");
                }}
                style={
                  {
                    fontSize: 20,
                    fontWeight: "600",
                    borderWidth: 1,
                    borderColor: "blue",
                    borderRadius: 7,
                    paddingHorizontal: 20,
                    paddingVertical: 6,
                  } as TextInputProps["style"]
                }
                keyboardType="numeric"
              />
            </View>
            {["1", "2", "3", "4", "5"].map((prizeNumber) => (
              <Button
                key={prizeNumber}
                variant={
                  selectedPrizes.includes(prizeNumber) ? "solid" : "outline"
                }
                style={[{ marginBottom: 10 }]}
                onPress={() => handlePrizeSelection(prizeNumber)}
              >
                {`${prizeNumber}º Prêmio`}
              </Button>
            ))}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button flex={1} mr={4} onPress={onClose}>
              Fechar
            </Button>
            <Button flex={1} onPress={handleConfirm}>
              Confirmar
            </Button>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
      <View style={styles.container}>
        <Text style={styles.title}>
          Você está participando dos seguintes prêmios
        </Text>

        <FlatList
          data={currentGame.bets}
          style={{ flex: 1 }}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: "row",
                ...localStyles.betItem,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={localStyles.betItemText}>
                  Prêmios: {numbersSelectedFormated(item.prizes)}
                </Text>
                <Text style={localStyles.betItemText}>
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
              <Button
                onPress={() => remove(index)}
                style={{ flexShrink: 1, backgroundColor: "red" }}
              >
                Remover
              </Button>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={{ flexDirection: "row" }}>
          <Button flex={1} mr={5} onPress={onOpen} variant={"subtle"}>
            Prêmios
          </Button>
          <Button flex={1} onPress={handleProceed}>
            Prosseguir
          </Button>
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // flex: 1,
    // flexDirection: "column",
    width: "100%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  prizeButton: {
    marginVertical: 7,
  },
  prizeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  selectedPrize: {
    backgroundColor: "#4CAF50",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 4,
    fontSize: 16,
    marginVertical: 10,
  },
  confirmButton: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  closeButton: {
    backgroundColor: "#FF5733",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  proceedButton: {
    backgroundColor: "#6c63ff",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  prizesButton: {
    backgroundColor: "#00aa1c",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  betItem: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  betItemText: {
    fontSize: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
