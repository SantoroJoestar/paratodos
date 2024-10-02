export const compareArrays = (arr1: string[], arr2: string[]) => {
  // Se os tamanhos são diferentes, eles não podem ser iguais
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Ordena os arrays e transforma-os em strings
  const sortedArr1 = arr1.slice().sort(); // slice() para não modificar o array original
  const sortedArr2 = arr2.slice().sort();

  // Compara as strings resultantes
  return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
};
