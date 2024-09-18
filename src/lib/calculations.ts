// Types
import { TCalculation } from "@/types";

export const calculate_total = ({
  transaction_type = "buy",
  quantity = 0,
  price = 0,
  tax = 0,
}: TCalculation) => {
  const calculate =
    transaction_type === "buy"
      ? Number(quantity) * Number(price) + Number(tax)
      : transaction_type === "sell"
      ? Number(quantity) * Number(price) - Number(tax)
      : 0;
  const result = Number(calculate.toFixed(2));
  return result;
};
