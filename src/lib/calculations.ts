// Types
import { TCalculation } from "@/types";

export const calculate_total = ({
  transaction_type = "buy",
  shares = 0,
  price = 0,
  tax = 0,
}: TCalculation) => {
  const calculate =
    transaction_type === "buy"
      ? Number(shares) * Number(price) + Number(tax)
      : transaction_type === "sell"
      ? Number(shares) * Number(price) + Number(tax)
      : 0;
  const result = Number(calculate.toFixed(2));
  return result;
};
