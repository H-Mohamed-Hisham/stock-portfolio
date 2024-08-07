"use client";

import { useQuery } from "@tanstack/react-query";

// Columns
import { stock_profit_loss_columns } from "@/columns/transaction-stock";

// Constants
import { FETCH_ALL_STOCK_PROFIT_LOSS } from "@/constants/query-key";

// Rest API
import { fetchAllStockProfitLoss } from "@/rest-api/stock-transaction";

// Components - Shadcn
import { Card, CardContent } from "@/components/ui/card";

// Components
import { DataTable, DataTableSkeleton } from "@/components/data-table";

const table_filter = {
  placeholder: "symbol",
  field: "stock_symbol",
};

export const ProfitLossTable = () => {
  // Query
  const { data, isFetching, isError, error, isSuccess }: any = useQuery({
    queryKey: [FETCH_ALL_STOCK_PROFIT_LOSS],
    queryFn: fetchAllStockProfitLoss,
  });

  return (
    <Card className="w-full">
      <CardContent className="py-6 px-1 md:px-4">
        {isFetching && <DataTableSkeleton />}

        {/* {isError && <AlertBox type="error" message={error?.response?.data} />} */}

        {!isFetching && isSuccess && (
          <DataTable
            columns={stock_profit_loss_columns}
            data={data}
            link={null}
            filter={table_filter}
          />
        )}
      </CardContent>
    </Card>
  );
};
