"use client";

import { ColumnDef } from "@tanstack/react-table";

// Types
import { TStock } from "@/types";

// Components - Shadcn
import { Checkbox } from "@/components/ui/checkbox";

// Components
import { DataTableColumnHeader } from "@/components/data-table";

export const stock_columns: ColumnDef<TStock>[] = [
  {
    accessorKey: "stock_symbol",
    header: ({ table, column }) => (
      // <div className="flex items-center">
      //   <Checkbox
      //     checked={
      //       table.getIsAllPageRowsSelected() ||
      //       (table.getIsSomePageRowsSelected() && "indeterminate")
      //     }
      //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      //     aria-label="Select all"
      //   />
      //   <DataTableColumnHeader column={column} title="Symbol" />
      // </div>
      <DataTableColumnHeader column={column} title="Symbol" />
    ),
  },
  {
    accessorKey: "stock_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
];
