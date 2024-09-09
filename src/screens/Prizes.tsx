/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
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
import {
  Actionsheet,
  Button,
  Input,
  KeyboardAvoidingView,
  useDisclose,
} from "native-base";

import { numbersSelectedFormated } from "../utils/numbersSelectedFormated";
import { border } from "native-base/lib/typescript/theme/styled-system";

type Props = NativeStackScreenProps<RootStackParamList, "Prizes">;

export type BetType = {
  prizes: string[];
  betAmount: string;
};

export const Prizes = ({ navigation, route }: Props) => {
  const [selectedPrizes, setSelectedPrizes] = useState<string[]>([]);
  const [betAmount, setBetAmount] = useState("");

  const [betValues, setBetValues] = useState<BetType[]>([]);

  const { isOpen, onOpen, onClose } = useDisclose();

  const handlePrizeSelection = (prizeNumber: string) => {
    if (selectedPrizes.includes(prizeNumber)) {
      setSelectedPrizes(selectedPrizes.filter((item) => item !== prizeNumber));
    } else {
      setSelectedPrizes([...selectedPrizes, prizeNumber]);
    }
  };

  const handleConfirm = () => {
    if (selectedPrizes.length === 0) {
      Alert.alert("Erro", "Selecione pelo menos um prêmio.");
    } else if (!betAmount || !Number(betAmount)) {
      Alert.alert("Erro", "Informe o valor da aposta.");
    } else {
      const newBet: BetType = {
        prizes: selectedPrizes,
        betAmount: betAmount,
      };
      setBetValues([...betValues, newBet]);
      setSelectedPrizes([]);
      setBetAmount("");
      onClose();
    }
  };

  const handleProceed = () => {
    if (betValues.length === 0) {
      Alert.alert("Erro", "Faça pelo menos uma aposta antes de prosseguir.");
    } else {
      navigation.navigate("ConfirmGame", {
        numbers: route.params.numbers,
        betValues,
      });
    }
  };

  console.log("betAmount: ", betAmount);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      h={{
        base: "400px",
      }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
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
                    fontSize: 30,
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
                style={[
                  localStyles.prizeButton,
                  selectedPrizes.includes(prizeNumber) &&
                    localStyles.selectedPrize,
                ]}
                onPress={() => handlePrizeSelection(prizeNumber)}
              >
                <Text
                  style={localStyles.prizeButtonText}
                >{`${prizeNumber}º Prêmio`}</Text>
              </Button>
            ))}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button
              style={[styles.actionButton, localStyles.closeButton]}
              onPress={onClose}
            >
              <Text style={styles.actionButtonText}>Fechar</Text>
            </Button>
            <Button
              style={[styles.actionButton, localStyles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.actionButtonText}>Confirmar</Text>
            </Button>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
      <View style={styles.container}>
        <Text style={styles.title}>
          Você está participando dos seguintes prêmios
        </Text>

        <FlatList
          data={betValues}
          style={{ flex: 1 }}
          renderItem={({ item }) => (
            <View style={localStyles.betItem}>
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
                  {item.betAmount}
                </MaskedText>
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={{ flexDirection: "row" }}>
          <Button
            style={[styles.actionButton, localStyles.prizesButton]}
            onPress={onOpen}
          >
            <Text style={styles.actionButtonText}>Prêmios</Text>
          </Button>
          <Button
            style={[styles.actionButton, localStyles.proceedButton]}
            onPress={handleProceed}
          >
            <Text style={styles.actionButtonText}>Prosseguir</Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    width: "100%",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  betItemText: {
    fontSize: 20,
    marginBottom: 5,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
