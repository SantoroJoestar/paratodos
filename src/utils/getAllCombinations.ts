/**
 * Função para gerar todas as permutações de um array, sem duplicações.
 * @param arr - O array de números ou caracteres.
 * @returns Um array com todas as permutações possíveis, sem duplicações.
 */
const generatePermutations = (arr: string[]): string[][] => {
  if (arr.length === 0) return [[]];

  const result: Set<string[]> = new Set();

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const remainingPermutations = generatePermutations(remaining);

    for (const perm of remainingPermutations) {
      result.add([current, ...perm]);
    }
  }

  return Array.from(result);
};

/**
 * Função para pegar um número e gerar todas as suas combinações únicas.
 * @param num - O número como string ou número.
 * @returns Um array de strings com todas as combinações possíveis, sem duplicações.
 */
export const getAllCombinations = (num: number | string): string[] => {
  const numArr = num.toString().split("");
  const permutations = generatePermutations(numArr);

  // Usar um Set para garantir combinações únicas
  const uniqueCombinations = new Set(permutations.map((perm) => perm.join("")));

  return Array.from(uniqueCombinations);
};
