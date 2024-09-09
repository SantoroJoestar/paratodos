import { Alert } from 'react-native';
// @ts-ignore
import { SPrinter } from '@makgabri/react-native-sunmi-printer';

export const print = () => {
  const content = `
    Nome do Jogo: Milhar
    Data da Aposta: ${new Date().toLocaleDateString()}
    Horário da Aposta: 14h
    Números apostados: 1234, 5678
    Valores apostados: R$ 10, R$ 20
    Total da aposta: R$ 30
  `;

  SPrinter.printText(content).then(() => {
    Alert.alert('Impressão realizada com sucesso');
  }).catch((error: Error) => {
    Alert.alert('Erro na impressão', error.message);
  });
};