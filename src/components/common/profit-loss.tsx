import clsx from "clsx";

export function ProfitLoss({
  status,
  value,
}: {
  status: string;
  value: string | null;
}) {
  return (
    <div
      className={clsx(
        "uppercase font-semibold",
        {
          "text-primary": status === "profit",
        },
        {
          "text-destructive": status === "loss",
        },
        {
          "text-info": status === "no profit no loss",
        }
      )}
    >
      {value ? value : status}
    </div>
  );
}
