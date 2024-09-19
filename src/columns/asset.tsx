import { ColumnDef } from "@tanstack/react-table";

// Types
import { TAsset } from "@/types";

// Components
import {
  ColumnHeader,
  TableCell,
  RowDeleteButton,
  RowEditButton,
} from "@/components/data-table";

export const asset_columns = (
  handleDelete: (id: string) => void
): ColumnDef<TAsset>[] => [
  {
    accessorKey: "symbol",
    header: ({ column }) => <ColumnHeader column={column} title="Symbol" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <ColumnHeader column={column} title="Type" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <TableCell cellAlign="right">
          <div className="flex items-center gap-x-2">
            <RowEditButton
              link={`/asset/update/${row.original?.id}`}
              disabled={false}
            />
            <RowDeleteButton
              row_id={row.getValue("id")}
              onClick={handleDelete}
              disabled={false}
            />
          </div>
        </TableCell>
      );
    },
  },
];
