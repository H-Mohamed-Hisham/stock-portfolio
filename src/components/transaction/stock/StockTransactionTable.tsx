"use client";

import { useQuery } from "@tanstack/react-query";

// Columns
import { transaction_stock_columns } from "@/constants/columns/transaction-stock";

// Constants
import { FETCH_ALL_STOCK_TRANSACTION } from "@/constants/query-key";
import { transaction_stock_link } from "@/constants/data-table-link";
import { transaction_stock_filter } from "@/constants/data-table-filter";

// Rest API
import { fetchAllStockTransaction } from "@/rest-api/stock-transaction";

// Components - Shadcn
import { Card, CardContent } from "@/components/ui/card";

// Components
import { DataTable, DataTableSkeleton } from "@/components/data-table";

export const StockTransactionTable = () => {
  // Query
  const { data, isFetching, isError, error, isSuccess }: any = useQuery({
    queryKey: [FETCH_ALL_STOCK_TRANSACTION],
    queryFn: fetchAllStockTransaction,
  });

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {isFetching && <DataTableSkeleton />}

        {/* {isError && <AlertBox type="error" message={error?.response?.data} />} */}

        {!isFetching && isSuccess && (
          <DataTable
            columns={transaction_stock_columns}
            data={data}
            link={transaction_stock_link}
            filter={transaction_stock_filter}
          />
        )}
      </CardContent>
    </Card>
  );
};
