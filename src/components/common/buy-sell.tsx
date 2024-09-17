import clsx from "clsx";

export function BuySell({ type }: { type: string }) {
  return (
    <div
      className={clsx(
        "uppercase font-semibold",
        {
          "text-primary": type === "buy",
        },
        {
          "text-destructive": type === "sell",
        }
      )}
    >
      {type}
    </div>
  );
}
