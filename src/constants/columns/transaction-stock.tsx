import { ColumnDef } from "@tanstack/react-table";

// Types
import { TStockTransaction } from "@/types";

// Components - Shadcn
// import { Checkbox } from "@/components/ui/checkbox";

// Components
import { DataTableColumnHeader } from "@/components/data-table";

export const transaction_stock_columns: ColumnDef<TStockTransaction>[] = [
  {
    accessorKey: "stock_symbol",
    header: ({ table, column }) => (
      <DataTableColumnHeader column={column} title="Symbol" />
    ),
  },
  {
    accessorKey: "shares",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shares" />
    ),
  },
];
