import { ColumnDef } from "@tanstack/react-table";

// Types
import { TStockTransaction } from "@/types";

// Components
import { DataTableColumnHeader } from "@/components/data-table";

export const all_transaction_columns: ColumnDef<TStockTransaction>[] = [
  {
    accessorKey: "Stock.stock_name",
    header: ({ table, column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "Stock.stock_symbol",
    header: ({ table, column }) => (
      <DataTableColumnHeader column={column} title="Symbol" />
    ),
  },
  {
    accessorKey: "shares",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Shares"
        // className="text-right"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("shares")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
  },
  {
    accessorKey: "tax",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tax" />
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
  },
];
