import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// API
import { fetch_asset_transaction } from "@/api";

// Constants
import { FETCH_ASSET_TRANSACTION_QUERY_KEY } from "@/constants/query-key";

// Columns
import { transaction_columns } from "@/columns";

// Components
import { DataTable } from "@/components/data-table";
import { LineSkeleton } from "@/components/skeleton";
import { AlertMessage, DeleteButton } from "@/components/common";

// Shadcn
import { Card, CardContent } from "@/components/ui/card";

const table_link = {
  show: true,
  text: "Create Transaction",
  link: "/transaction/create",
};

const table_filter = {
  placeholder: "transaction type",
  field: "transaction_type",
  filter_type: "select-input",
};

export function AssetTransaction() {
  // Router
  const { asset_id } = useParams<{ asset_id: string }>();

  // Local State
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Query
  const { data, isFetched, error } = useQuery({
    queryKey: [
      FETCH_ASSET_TRANSACTION_QUERY_KEY,
      {
        asset_id: asset_id,
      },
    ],
    queryFn: () =>
      fetch_asset_transaction({
        asset_id: asset_id,
      }),
  });

  // Handle Selected Rows Change
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectedRowsChange = (rows: any[]) => {
    setSelectedRows(rows);
    console.log("Selected Rows:", rows);
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    console.log("Deleting transaction with ID:", id);
  };

  // Handle Delete Selected Row
  const handleDeleteSelectedRow = () => {
    console.log("Deleting rows : ", selectedRows);
  };

  return (
    <Card className="w-full h-full p-3">
      <CardContent className="p-1">
        {!isFetched && <LineSkeleton count={5} />}

        {error && <AlertMessage message={error.message} />}

        {isFetched && !error && (
          <>
            <div className="flex items-center gap-4">
              {selectedRows.length > 0 && (
                <DeleteButton onClick={() => handleDeleteSelectedRow()} />
              )}
            </div>

            <DataTable
              columns={transaction_columns(false, handleDelete)}
              data={data}
              link={table_link}
              filter={table_filter}
              row_id_key="id"
              onSelectedRowsChange={handleSelectedRowsChange}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
