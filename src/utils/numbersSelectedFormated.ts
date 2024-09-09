export const numbersSelectedFormated = (numbersString: string[]) => {
  const numbers = numbersString.map((n) => Number(n));

  if (numbers.length === 0) return "";

  // Ordena os números para garantir que estejam em ordem crescente
  numbers.sort((a, b) => a - b);

  let result = "";
  let start = numbers[0]; // Início do intervalo
  let end = start; // Fim do intervalo

  for (let i = 1; i <= numbers.length; i++) {
    if (i < numbers.length && numbers[i] === end + 1) {
      // Se o próximo número for consecutivo, expande o intervalo
      end = numbers[i];
    } else {
      // Se o próximo número não for consecutivo, finaliza o intervalo
      if (start === end) {
        // Se o intervalo tem um único número
        result += start;
      } else {
        // Se o intervalo tem mais de um número
        result += `${start}-${end}`;
      }

      if (i < numbers.length) {
        // Adiciona uma vírgula se não for o último intervalo
        result += ", ";
        // Inicia um novo intervalo
        start = numbers[i];
        end = start;
      }
    }
  }

  return result;
};
