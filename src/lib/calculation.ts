export const calculateTotal = ({ shares = 0, price = 0, tax = 0 }) => {
  const calculate = Number(shares) * Number(price) + Number(tax);
  const result = Number(calculate.toFixed(2));
  return result;
};
