"use client";

import { useQuery } from "@tanstack/react-query";

// Columns
import { all_stock_columns } from "@/columns/stock";

// Constants
import { FETCH_ALL_STOCK } from "@/constants/query-key";

// Rest API
import { fetchAllStock } from "@/rest-api/stock";

// Components - Shadcn
import { Card, CardContent } from "@/components/ui/card";

// Components
import { DataTable, DataTableSkeleton } from "@/components/data-table";

const table_filter = {
  placeholder: "symbol",
  field: "stock_symbol",
};

const table_link = {
  show: true,
  text: "Add Stock",
  link: "/stock/add",
};

export const StockTable = () => {
  // Query
  const { data, isFetching, isError, error, isSuccess }: any = useQuery({
    queryKey: [FETCH_ALL_STOCK],
    queryFn: fetchAllStock,
  });

  return (
    <Card className="w-full">
      <CardContent className="py-6 px-1 md:px-4">
        {isFetching && <DataTableSkeleton />}

        {/* {isError && <AlertBox type="error" message={error?.response?.data} />} */}

        {!isFetching && isSuccess && (
          <DataTable
            columns={all_stock_columns}
            data={data}
            link={table_link}
            filter={table_filter}
          />
        )}
      </CardContent>
    </Card>
  );
};
