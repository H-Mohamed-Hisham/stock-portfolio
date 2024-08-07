import { ColumnDef } from "@tanstack/react-table";

// Types
import { TStockTransaction, TStockProfitLoss } from "@/types";

// Lib
import { formatDate } from "@/lib/formatter";

// Components
import { DataTableColumnHeader, DataTableCell } from "@/components/data-table";
import { BuySell } from "@/components/common/BuySell";
import { ProfitLoss } from "@/components/common/ProfitLoss";

export const all_transaction_columns: ColumnDef<TStockTransaction>[] = [
  {
    accessorKey: "Stock.stock_name",
    header: ({ table, column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    id: "stock_symbol",
    accessorKey: "Stock.stock_symbol",
    header: ({ table, column }) => (
      <DataTableColumnHeader column={column} title="Symbol" />
    ),
  },
  {
    accessorKey: "date",
    header: ({ table, column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <DataTableCell type="left">
        {formatDate(row.getValue("date"))}
      </DataTableCell>
    ),
  },
  {
    accessorKey: "transaction_type",
    header: ({ table, column }) => (
      <DataTableColumnHeader column={column} title="Transaction Type" />
    ),
    cell: ({ row }) => (
      <DataTableCell type="left">
        <BuySell type={row.getValue("transaction_type")} />
      </DataTableCell>
    ),
  },
  {
    accessorKey: "shares",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Shares"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <DataTableCell type="right">{row.getValue("shares")}</DataTableCell>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Price"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <DataTableCell type="right">{row.getValue("price")}</DataTableCell>
    ),
  },
  {
    accessorKey: "tax",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Tax"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <DataTableCell type="right">{row.getValue("tax")}</DataTableCell>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <DataTableCell type="right">{row.getValue("total")}</DataTableCell>
    ),
  },
];

export const stock_profit_loss_columns: ColumnDef<TStockTransaction>[] = [
  {
    accessorKey: "stock_name",
    header: ({ table, column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    id: "stock_symbol",
    accessorKey: "stock_symbol",
    header: ({ table, column }) => (
      <DataTableColumnHeader column={column} title="Symbol" />
    ),
  },
  {
    accessorKey: "total_shares",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Shares"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <DataTableCell type="right">{row.getValue("total_shares")}</DataTableCell>
    ),
  },
  {
    accessorKey: "total_invested",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Invested"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <DataTableCell type="right">
        {row.getValue("total_invested")}
      </DataTableCell>
    ),
  },
  {
    accessorKey: "profit_loss_amount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Returns"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <DataTableCell type="right">
        {row.getValue("profit_loss_amount")}
      </DataTableCell>
    ),
  },
  {
    accessorKey: "profit_loss_status",
    header: ({ table, column }) => (
      <DataTableColumnHeader column={column} title="Profit/Loss" />
    ),
    cell: ({ row }) => (
      <DataTableCell type="left">
        <ProfitLoss type={row.getValue("profit_loss_status")} />
      </DataTableCell>
    ),
  },
];
