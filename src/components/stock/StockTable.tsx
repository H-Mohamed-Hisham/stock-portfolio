"use client";

import { useQuery } from "@tanstack/react-query";

// Columns
import { stock_columns } from "@/constants/columns/stock";

// Constants
import { FETCH_ALL_STOCK } from "@/constants/query-key";
import { stock_link } from "@/constants/data-table-link";
import { stock_filter } from "@/constants/data-table-filter";

// Rest API
import { fetchAllStock } from "@/rest-api/stock";

// Components - Shadcn
import { Card, CardContent } from "@/components/ui/card";

// Components
import { DataTable, DataTableSkeleton } from "@/components/data-table";

export const StockTable = () => {
  // Query
  const { data, isFetching, isError, error, isSuccess }: any = useQuery({
    queryKey: [FETCH_ALL_STOCK],
    queryFn: fetchAllStock,
  });

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {isFetching && <DataTableSkeleton />}

        {/* {isError && <AlertBox type="error" message={error?.response?.data} />} */}

        {!isFetching && isSuccess && (
          <DataTable
            columns={stock_columns}
            data={data}
            link={stock_link}
            filter={stock_filter}
          />
        )}
      </CardContent>
    </Card>
  );
};
