export const calculateTotal = ({ shares = 0, price = 0, tax = 0 }) => {
  const result = Number(shares) * Number(price) + Number(tax);
  return result;
};
