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
  RowEditButton,
  BuySell,
} from "@/components/data-table";

// Shadcn
import { Checkbox } from "@/components/ui/checkbox";

export const transaction_columns = (
  show_link = false,
  handleDelete: (id: string) => void
): ColumnDef<TTransaction>[] => [
  {
    id: "name",
    accessorKey: "asset.name",
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
          <Link to={`/transaction/asset/${row.original.asset?.id}`}>
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
    id: "date",
    accessorKey: "date",
    header: ({ column }) => <ColumnHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <TableCell cellAlign="left">
        {formatDate({ date: row.getValue("date") })}
      </TableCell>
    ),
  },
  {
    id: "transaction_type",
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
    id: "quantity",
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
    id: "price",
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
    id: "tax",
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
    id: "total",
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
    accessorKey: "id",
    header: "",
    cell: ({ row, table }) => {
      return (
        <TableCell cellAlign="right">
          <div className="flex items-center gap-x-2">
            <RowEditButton
              link={`/transaction/update/${row.original?.id}`}
              disabled={table.getFilteredSelectedRowModel().rows.length > 0}
            />
            <RowDeleteButton
              row_id={row.getValue("id")}
              onClick={handleDelete}
              disabled={table.getFilteredSelectedRowModel().rows.length > 0}
            />
          </div>
        </TableCell>
      );
    },
  },
];
