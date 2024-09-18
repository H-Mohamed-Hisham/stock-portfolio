import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

// Types
import { TTransaction } from "@/types";

// Lib
import { formatDate, formatNumber } from "@/lib/formatters";

// Components
import {
  ColumnHeader,
  TableCell,
  RowDeleteButton,
} from "@/components/data-table";
import { BuySell } from "@/components/common";

// Shadcn
import { Checkbox } from "@/components/ui/checkbox";

export const transaction_columns = (
  show_link = false,
  handleDelete: (id: string) => void
): ColumnDef<TTransaction>[] => [
  {
    accessorKey: "id",
    header: ({ table, column }) => (
      <div className="flex items-center gap-x-1">
        <Checkbox
          className="bg-primary-foreground data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <ColumnHeader column={column} title="Name" />
      </div>
    ),
    cell: ({ row }) => (
      <TableCell cellAlign="left">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
        {show_link ? (
          <Link to={`/transaction-asset/${row.original.asset?.id}`}>
            {row.original?.asset?.name}
          </Link>
        ) : (
          <span>{row.original?.asset?.name}</span>
        )}
      </TableCell>
    ),
  },
  {
    id: "symbol",
    accessorKey: "asset.symbol",
    header: ({ column }) => <ColumnHeader column={column} title="Symbol" />,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <ColumnHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <TableCell cellAlign="left">{formatDate(row.getValue("date"))}</TableCell>
    ),
  },
  {
    accessorKey: "transaction_type",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Transaction Type" />
    ),
    cell: ({ row }) => (
      <TableCell cellAlign="left">
        <BuySell type={row.getValue("transaction_type")} />
      </TableCell>
    ),
  },
  {
    accessorKey: "quantity",
    enableSorting: false,
    header: ({ column }) => (
      <ColumnHeader column={column} title="Quantity" className="justify-end" />
    ),
    cell: ({ row }) => (
      <TableCell cellAlign="right">{row.getValue("quantity")}</TableCell>
    ),
  },
  {
    accessorKey: "price",
    enableSorting: false,
    header: ({ column }) => (
      <ColumnHeader column={column} title="Price" className="justify-end" />
    ),
    cell: ({ row }) => (
      <TableCell cellAlign="right">
        {formatNumber({ value: row.getValue("price") })}
      </TableCell>
    ),
  },
  {
    accessorKey: "tax",
    enableSorting: false,
    header: ({ column }) => (
      <ColumnHeader column={column} title="Tax" className="justify-end" />
    ),
    cell: ({ row }) => (
      <TableCell cellAlign="right">
        {formatNumber({ value: row.getValue("tax") })}
      </TableCell>
    ),
  },
  {
    accessorKey: "total",
    enableSorting: false,
    header: ({ column }) => (
      <ColumnHeader column={column} title="Total" className="justify-end" />
    ),
    cell: ({ row }) => (
      <TableCell cellAlign="right">
        {formatNumber({ value: row.getValue("total") })}
      </TableCell>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <RowDeleteButton row_id={row.getValue("id")} onClick={handleDelete} />
      );
    },
  },
];
