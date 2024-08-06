"use client";

import { useQuery } from "@tanstack/react-query";

// Columns
import { all_transaction_columns } from "@/constants/columns/transaction-stock";

// Constants
import { FETCH_ALL_STOCK_TRANSACTION } from "@/constants/query-key";

// Rest API
import { fetchAllStockTransaction } from "@/rest-api/stock-transaction";

// Components - Shadcn
import { Card, CardContent } from "@/components/ui/card";

// Components
import { DataTable, DataTableSkeleton } from "@/components/data-table";

// Types
import { TDataTableLink, TDataTableFilter } from "@/types";

const transaction_stock_link: TDataTableLink = {
  show: true,
  text: "Add Stock Transaction",
  link: "/transaction/stock/add",
};

const transaction_stock_filter: TDataTableFilter = {
  placeholder: "symbol",
  field: "stock_symbol",
};

export const AllTransactionTable = () => {
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
            columns={all_transaction_columns}
            data={data}
            link={transaction_stock_link}
            filter={transaction_stock_filter}
          />
        )}
      </CardContent>
    </Card>
  );
};
