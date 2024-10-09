import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Text,
  StyleSheet,
  Alert,
  FlatList,
  TextInputProps,
  TextInput,
  ListRenderItem,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../types/routes.type";
import { Modal, Button, View, Center } from "native-base";

import { numbersSelectedFormated } from "../utils/numbersSelectedFormated";
import { BetType } from "../types/bet.type";
import { useCart } from "../providers/CartContext";
import { GAMES } from "../constants/GAMES";

import { formatterBRL, parserBRL } from "../utils/formatCurrency";
import { styles } from "../styles";
import { compareArrays } from "../utils/compareArrays";
import { clone } from "../utils/clone";
import { TitleBack } from "../components/TitleBack";

type Props = NativeStackScreenProps<RootStackParamList, "Prizes">;

export default ({ route, navigation }: Props) => {
  const [selectedPrizes, setSelectedPrizes] = useState<string[]>([]);
  const [betAmount, setBetAmount] = useState(0);
  const [selectAll, setSelectAll] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const { cart, currentGame, setCurrentGame, setCart, chaveValendo } =
    useCart();

  const TYPE_GAME = GAMES[currentGame._id];

  const handlePrizeSelection = useCallback(
    (prizeNumber: string) => {
      if (selectedPrizes.includes(prizeNumber)) {
        setSelectedPrizes(
          selectedPrizes.filter((item) => item !== prizeNumber)
        );
      } else {
        setSelectedPrizes([...selectedPrizes, prizeNumber]);
      }
    },
    [selectedPrizes]
  );

  useEffect(() => {
    setShowModal(true);
  }, []);

  const remove = useCallback((index: number) => {
    setSelectedPrizes((prev) => prev.filter((_, i) => i !== index));
    setCurrentGame((prev) => ({
      ...prev,
      bets: prev.bets.filter((_, i) => i !== index),
    }));
  }, []);

  const handleConfirm = useCallback(() => {
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
      setBetAmount(0);
      setShowModal(false); // Fecha o modal após confirmar
    }
  }, [betAmount, selectedPrizes, currentGame.bets]);

  const handleProceed = useCallback(() => {
    if (currentGame.bets.length === 0) {
      Alert.alert("Erro", "Faça pelo menos uma aposta antes de prosseguir.");
    } else {
      if (cart.games.length === 0) {
        setCart((prev) => ({
          ...prev,
          games: [currentGame],
        }));
      }

      if (cart.games.length > 0) {
        const lastGame = clone(cart.games[cart.games.length - 1]);
        let games = clone(cart.games);

        const lastNumbers = clone(lastGame.numbers.sort());
        const currentNumbers = clone(lastGame.numbers.sort());

        if (
          lastGame._id === currentGame._id &&
          compareArrays(lastNumbers, currentNumbers)
        ) {
          games[games.length - 1] = currentGame;

          setCart((prev) => ({
            ...prev,
            games: games,
          }));
        } else {
          setCart((prev) => ({
            ...prev,
            games: [...prev.games, currentGame],
          }));
        }
      }

      if (chaveValendo) navigation.replace("MenuGames");

      navigation.replace("Cart");
    }
  }, [currentGame, cart.games]);

  useEffect(() => {
    if (TYPE_GAME.markAll) setSelectedPrizes(["1", "2", "3", "4", "5"]);
  }, [TYPE_GAME]);

  const showItem = useCallback<ListRenderItem<BetType>>(
    ({ item, index }) => (
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
            Valor: {formatterBRL(item.valueBet)}
          </Text>
        </View>
        <Button
          onPress={() => remove(index)}
          style={{ flexShrink: 1, backgroundColor: "red" }}
        >
          Remover
        </Button>
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <TitleBack
        navigation={navigation}
        route={route}
        title={"Premios - " + TYPE_GAME.label}
        params={{
          type: TYPE_GAME.id,
          pule: cart.pule,
        }}
      />
      <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="500px">
            <Modal.CloseButton />
            <Modal.Header>Selecione os prêmios</Modal.Header>
            <Modal.Body>
              <View style={{ paddingVertical: 0 }}>
                <TextInput
                  value={formatterBRL(betAmount)}
                  onChangeText={(text) => {
                    setBetAmount(parserBRL(text));
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
                      marginBottom: 10,
                      color: "black",
                    } as TextInputProps["style"]
                  }
                  keyboardType="numeric"
                />
              </View>
              {TYPE_GAME.markAll && (
                <Button
                  bg={"blue.700"}
                  style={[{ marginBottom: 10 }]}
                  width={"fit"}
                  onPress={() => setSelectedPrizes(["1", "2", "3", "4", "5"])}
                >
                  Concorrendo do 1º ao 5º
                </Button>
              )}
              {!TYPE_GAME.markAll && (
                <>
                  <Button
                    bg={"blue.700"}
                    style={[{ marginBottom: 10 }]}
                    width={"fit"}
                    onPress={() => {
                      if (selectAll) {
                        setSelectAll(false);
                        setSelectedPrizes(["1", "2", "3", "4", "5"]);
                      } else {
                        setSelectAll(true);
                        setSelectedPrizes([]);
                      }
                    }}
                  >
                    Selecionar do 1º ao 5º
                  </Button>
                  {["1", "2", "3", "4", "5"].map((prizeNumber) => (
                    <TouchableWithoutFeedback
                      key={prizeNumber}
                      onPress={() => handlePrizeSelection(prizeNumber)}
                    >
                      <View
                        style={[
                          {
                            marginBottom: 10,
                            padding: 10,
                            alignItems: "center",
                            backgroundColor: selectedPrizes.includes(
                              prizeNumber
                            )
                              ? "#ea580c"
                              : "white",
                            borderWidth: 1,
                            borderColor: "gray",
                          },
                        ]}
                      >
                        <Text
                          style={{
                            color: selectedPrizes.includes(prizeNumber)
                              ? "white"
                              : "black",
                          }}
                        >{`${prizeNumber}º Prêmio`}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="red"
                  onPress={() => setShowModal(false)}
                >
                  Fechar
                </Button>
                <Button bg="blue.700" onPress={handleConfirm}>
                  Confirmar
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>

      <Text style={styles.title}>
        Você está participando dos seguintes prêmios
      </Text>

      <FlatList
        data={currentGame.bets}
        style={{ flex: 1 }}
        renderItem={showItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{ flexDirection: "row" }}>
        <Button
          bg="green.500"
          flex={1}
          mr={5}
          onPress={() => setShowModal(true)}
          variant={"subtle"}
        >
          Prêmios
        </Button>
        <Button bg="blue.700" flex={1} onPress={handleProceed}>
          Prosseguir
        </Button>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  modalText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
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
    color: "black",
  },
});
