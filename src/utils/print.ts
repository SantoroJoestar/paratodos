import { Alert } from "react-native";
// @ts-ignore
import * as SunmiPrinterLibrary from "@mitsuharu/react-native-sunmi-printer-library";
import { GameType } from "../types/game.type";

export const print = async (games: GameType[]) => {
  try {
    await SunmiPrinterLibrary.prepare();

    const content = `
    PULE: id
    Nome do Jogo: Milhar
    Data da Aposta: ${new Date().toLocaleDateString()}
    Horário da Aposta: 14h
    Números apostados: 1234, 5678
    Valores apostados: R$ 10, R$ 20
    Total da aposta: R$ 30

    PULE: id
    Nome do Jogo: Milhar
    Data da Aposta: ${new Date().toLocaleDateString()}
    Horário da Aposta: 14h
    Números apostados: 1234, 5678
    Valores apostados: R$ 10, R$ 20
    Total da aposta: R$ 30
  `;

    await SunmiPrinterLibrary.printText(content)
      .then(() => {
        Alert.alert("Impressão realizada com sucesso");
      })
      .catch((error: Error) => {
        Alert.alert("Erro na impressão", error.message);
      });
  } catch (error: any) {
    Alert.alert("This device is not supported.");
  }
};
