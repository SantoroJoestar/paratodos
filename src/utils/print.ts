import { Alert } from "react-native";
// @ts-ignore
import * as SunmiPrinterLibrary from "@mitsuharu/react-native-sunmi-printer-library";

import { formatCurrency } from "./formatCurrency";
import { format } from "date-fns";
import { CartType } from "../types/cart.type";
import { GAMES } from "../constants/GAMES";
import { calculateAmountGame } from "./calculateAmountGame";
import { numbersSelectedFormated } from "./numbersSelectedFormated";

export const print = async (cart: CartType) => {
  try {
    await SunmiPrinterLibrary.prepare();

    const header = `
    DEMO-NAO VALIDO
    Via do Cliente
    Data: ${format(cart.date, "dd/MM/yyyy")}
    Pule: ${cart.pule}
    Data: ${format(cart.date, "dd/MM/yyyy HH:mm:ss")}
    Terminal: 000001
    Operador: TESTE\n
    -----------------------------
    APOSTAS\n`;

    // Dinamicamente gerar os jogos
    const jogos = cart.games
      .map((game, index) => {
        const numerosFormatados = game.numbers.join(" ");
        const apostasFormatadas = game.bets
          .map(
            (bet) =>
              `${GAMES[game._id].label[0]} ${numbersSelectedFormated(bet.prizes)} ---------  ${formatCurrency(Number(bet.valueBet))}\n`
          )
          .join("\n\n");

        return (
          `${GAMES[game._id].label.toUpperCase()}\n` +
          `${numerosFormatados}\n` +
          `${apostasFormatadas}\n`
        );
      })
      .join("\n");

    // Rodapé fixo
    const footer = `
    -----------------------------
    Total: ${formatCurrency(Number(calculateAmountGame(cart.games)))}
    -----------------------------
    Vale o impresso. Confira seu jogo \n
    DEMO- BILHETE NAO VALIDO
    Reclamações: 7 dia(s)\n`;

    // Conteúdo completo
    const content = header + jogos + footer;

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
