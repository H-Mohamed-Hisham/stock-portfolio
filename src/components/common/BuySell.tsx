import clsx from "clsx";

type Props = {
  type: "buy" | "sell";
};

export const BuySell = ({ type }: Props) => {
  return (
    <div
      className={clsx(
        "uppercase font-semibold",
        {
          "text-green-800/95 dark:text-green-500/95": type === "buy",
        },
        {
          "text-red-800/95 dark:text-red-500/95": type === "sell",
        }
      )}
    >
      {type}
    </div>
  );
};
