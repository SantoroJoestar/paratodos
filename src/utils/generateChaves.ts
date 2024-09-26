// Função que formata automaticamente a partir de um padrão
export const formatarNumeros = (numero: string, formato: string) => {
    let resultado = '';
    let indiceNumero = numero.length - 1; // Começa do final do número
    let indiceFormato = formato.length - 1; // Começa do final do formato

    // Percorre o formato de trás para frente e substitui os dígitos conforme o padrão
    while (indiceFormato >= 0) {
      if (formato[indiceFormato] === '0') {
        resultado = numero[indiceNumero] + resultado; // Adiciona dígito do número
        indiceNumero--;
      } else if (formato[indiceFormato] === '-') {
        resultado = '-' + resultado; // Adiciona hífen no resultado
      }
      indiceFormato--; // Anda para o próximo caractere do formato
    }

    return resultado;
  
};