import { Alert } from "react-native";
// @ts-ignore
import * as SunmiPrinterLibrary from "@mitsuharu/react-native-sunmi-printer-library";

import { formatterBRL } from "./formatCurrency";
import { format } from "date-fns";
import { CartType } from "../types/cart.type";
import { GAMES } from "../constants/GAMES";
import { calculateAmountGame } from "./calculateAmountGame";
import { numbersSelectedFormated } from "./numbersSelectedFormated";
import { UserType } from "../types/user.type";

export const print = async (cart: CartType, cambista: UserType) => {
  try {
    await SunmiPrinterLibrary.prepare();

    // const imagePath = await moveImageToFileSystem();

    // const imageBase64 = await convertImageToBase64(imagePath)

    // await SunmiPrinterLibrary.printImage(imageBase64, 10, "grayscale")

    const header = `
Paratodos

Via do Cliente

Data: ${format(cart.dateCreated, "dd/MM/yyyy HH:mm:ss")}

Pule: ${cart.pule}
Data da Aposta: ${format(cart.dateBet, "dd/MM/yyyy")}
Extração: ${cart.time} HRS
Terminal: 00001
Cambista: ${cambista.name}
--------------------------------
            APOSTAS
--------------------------------\n`;

    // Dinamicamente gerar os jogos
    const jogos = cart.games
      .map((game, index) => {
        const numerosFormatados = game.numbers.join(" ");
        const apostasFormatadas = game.bets
          .map(
            (bet) =>
              `${GAMES[game._id].label[0]} ${numbersSelectedFormated(
                bet.prizes
              )} ---------  ${formatterBRL(Number(bet.valueBet))}\n`
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
--------------------------------
Total: ${formatterBRL(calculateAmountGame(cart.games))}
--------------------------------
Reclamações: 7 dia(s)
--------------------------------
Repetir Pule:`;

    // Conteúdo completo
    const content = header + jogos + footer;

    await SunmiPrinterLibrary.printText(content);

    const qrCodeContent = cart.pule;

    await SunmiPrinterLibrary.printQRCode(qrCodeContent, 10, "middle");

    await SunmiPrinterLibrary.printText("\n\n");

    Alert.alert("Apostas confirmadas! Impressão realizada com sucesso");
  } catch (error: any) {
    Alert.alert("Erro na impressão: ", error?.message || "Dispositivo não tem suporte para impressão");
  }
};
