import { ColumnDef } from "@tanstack/react-table";

// Types
import { TStockTransaction, TStockProfitLoss } from "@/types";

// Lib
import { formatDate } from "@/lib/formatter";

// Components
import { DataTableColumnHeader, DataTableCell } from "@/components/data-table";
import { BuySell, ProfitLossAmount, ProfitLoss } from "@/components/common";

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
      <DataTableCell cellAlign="left">
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
      <DataTableCell cellAlign="left">
        <BuySell type={row.getValue("transaction_type")} />
      </DataTableCell>
    ),
  },
  {
    accessorKey: "shares",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Shares"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <DataTableCell cellAlign="right">{row.getValue("shares")}</DataTableCell>
    ),
  },
  {
    accessorKey: "price",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Price"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <DataTableCell cellAlign="right" isRupees={true}>
        {row.getValue("price")}
      </DataTableCell>
    ),
  },
  {
    accessorKey: "tax",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Tax"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <DataTableCell cellAlign="right" isRupees={true}>
        {row.getValue("tax")}
      </DataTableCell>
    ),
  },
  {
    accessorKey: "total",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <DataTableCell cellAlign="right" isRupees={true}>
        {row.getValue("total")}
      </DataTableCell>
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
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Shares"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <DataTableCell cellAlign="right">
        {row.getValue("total_shares")}
      </DataTableCell>
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
      <DataTableCell cellAlign="right" isRupees={true}>
        {row.getValue("total_invested")}
      </DataTableCell>
    ),
  },
  {
    accessorKey: "total_returns",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Returns"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <DataTableCell cellAlign="right" isRupees={true}>
        {row.getValue("total_returns")}
      </DataTableCell>
    ),
  },
  {
    accessorKey: "profit_loss_amount",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Profit/Loss Margin"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <DataTableCell cellAlign="right">
        <ProfitLossAmount
          type={row.getValue("profit_loss_status")}
          amount={row.getValue("profit_loss_amount")}
        />
      </DataTableCell>
    ),
  },
  {
    accessorKey: "profit_loss_status",
    enableSorting: false,
    header: ({ table, column }) => (
      <DataTableColumnHeader column={column} title="Profit/Loss" />
    ),
    cell: ({ row }) => (
      <DataTableCell cellAlign="left">
        <ProfitLoss type={row.getValue("profit_loss_status")} />
      </DataTableCell>
    ),
  },
];
