export const formatCurrency = (number: number) => {
  const dividedNumber = number / 100;

  return dividedNumber.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
