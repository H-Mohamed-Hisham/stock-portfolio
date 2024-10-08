/* eslint-disable @typescript-eslint/no-explicit-any */

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
  Row,
} from "@tanstack/react-table";

// Icons
import { SquarePlus } from "lucide-react";

// Types
import { TDataTableLink, TDataTableFilter, TLabelValue } from "@/types";

// Constants
import { transaction_type_dropdown } from "@/constants/dropdown";

// Components
import { Pagination, GlobalFilter } from "@/components/data-table";

// Shadcn
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
  onSelectedRowsChange?: (selectedRows: TData[]) => void;
  globalFilterFn: any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  link = null,
  filter,
  onSelectedRowsChange = () => {},
  globalFilterFn = () => {},
}: DataTableProps<TData, TValue>) {
  // Local State
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [prevSelectedRows, setPrevSelectedRows] = useState<TData[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");

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
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: globalFilterFn,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
  });

  // UseEffect
  useEffect(() => {
    const selectedRows =
      table.getSelectedRowModel().rows.map((row: Row<TData>) => row.original) ||
      [];

    // Only trigger the callback if selected rows have changed
    if (JSON.stringify(selectedRows) !== JSON.stringify(prevSelectedRows)) {
      setPrevSelectedRows(selectedRows);
      onSelectedRowsChange(selectedRows);
    }
  }, [rowSelection, onSelectedRowsChange, table, prevSelectedRows]);

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-y-2 py-4">
        {filter.filter_type === "text-input" && (
          <GlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            placeholder={filter.placeholder}
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
