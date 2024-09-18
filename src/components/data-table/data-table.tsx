import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

// Icons
import { SquarePlus } from "lucide-react";

// Types
import { TDataTableLink, TDataTableFilter, TLabelValue } from "@/types";

// Constants
import { transaction_type_dropdown } from "@/constants/dropdown";

// Components
import { Pagination } from "@/components/data-table";

// Shadcn
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  link: TDataTableLink | null;
  filter: TDataTableFilter;
  row_id_key?: string;
  onSelectedRowsChange?: (selectedRows: TData[]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  link = null,
  filter,
  row_id_key = "",
  onSelectedRowsChange = () => {},
}: DataTableProps<TData, TValue>) {
  // Local State
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [prevSelectedRows, setPrevSelectedRows] = useState<TData[]>([]);

  // Hook
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  // UseEffect
  useEffect(() => {
    const selectedRows = table
      .getSelectedRowModel()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .rows.map((row: any) => row.original[row_id_key]);

    // Only trigger the callback if selected rows have changed
    if (JSON.stringify(selectedRows) !== JSON.stringify(prevSelectedRows)) {
      setPrevSelectedRows(selectedRows);
      onSelectedRowsChange(selectedRows);
    }
  }, [rowSelection, onSelectedRowsChange, table, prevSelectedRows, row_id_key]);

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-y-2 py-4">
        {filter.filter_type === "text-input" && (
          <Input
            placeholder={`Filter by ${filter.placeholder}`}
            value={
              (table.getColumn(filter.field)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(filter.field)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}

        {filter.filter_type === "select-input" && (
          <Select
            onValueChange={(value) => {
              table
                .getColumn(filter.field)
                ?.setFilterValue(value === "all" ? "" : value);
            }}
            defaultValue="all"
            value={table.getColumn(filter.field)?.getFilterValue() as string}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={`Filter by ${filter.placeholder}`} />
            </SelectTrigger>

            <SelectContent>
              {transaction_type_dropdown.map(
                (item: TLabelValue, index: number) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        )}

        {link?.show && (
          <Link
            to={link.link}
            className="flex items-center text-sm font-semibold leading-6 rounded-lg px-3 py-1 bg-primary text-primary-foreground"
          >
            <SquarePlus className="mr-2 h-5 w-5" />
            {link.text}
          </Link>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-primary text-primary-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No data to display.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination table={table} />
    </div>
  );
}
