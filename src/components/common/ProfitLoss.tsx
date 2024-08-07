import clsx from "clsx";

type Props = {
  type: "profit" | "loss" | "no profit no loss";
};

export const ProfitLoss = ({ type }: Props) => {
  return (
    <div
      className={clsx(
        "uppercase font-semibold",
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
      {type}
    </div>
  );
};
