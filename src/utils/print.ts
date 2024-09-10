import { Alert } from "react-native";
// @ts-ignore
import * as SunmiPrinterLibrary from "@mitsuharu/react-native-sunmi-printer-library";
import { GameType } from "../types/game.type";

import { calculateAmount } from "./calculateAmount";
import { formatCurrency } from "./formatCurrency";
import { format } from "date-fns";

export const print = async (games: GameType[]) => {
  try {
    await SunmiPrinterLibrary.prepare();

    const content = games
      .map(
        (game) => `
  Pule: ${game.pule}
  Jogo: ${game.name}
  Data: ${format(game.date, "dd/MM/yyyy")}
  Horário: ${game.time}
  Números apostados: ${game.numbers.join(", ")}
  Valores apostados: ${game.bets.map((bet) => bet.valueBet).join(", ")}
  Total da aposta: ${formatCurrency(Number(calculateAmount(game.bets)))}
`
      )
      .join("\n\n");

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
