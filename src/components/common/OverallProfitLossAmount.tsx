import clsx from "clsx";

// Lib
import { formatNumber } from "@/lib/formatter";

type Props = {
  type: "profit" | "loss" | "no profit no loss";
  amount: number;
};

export const OverallProfitLossAmount = ({ type, amount }: Props) => {
  return (
    <div
      className={clsx(
        "font-semibold",
        {
          "text-green-800/95 dark:text-green-500/95": type === "profit",
        },
        {
          "text-red-800/95 dark:text-red-500/95": type === "loss",
        },
        {
          "text-blue-800/95 dark:text-blue-500/95":
            type === "no profit no loss",
        }
      )}
    >
      {formatNumber({ value: amount, show_rupee_symbol: true })}
    </div>
  );
};
