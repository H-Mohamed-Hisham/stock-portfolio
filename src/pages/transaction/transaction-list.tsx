import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

// API
import { transaction_list } from "@/api";

// Constants
import { TRANSACTION_LIST_QUERY_KEY } from "@/constants/query-key";
import { transaction_type_dropdown } from "@/constants/dropdown";

// Columns
import { transaction_columns } from "@/columns";

// Components
import { PageLayout } from "@/components/layout";
import { DataTable } from "@/components/data-table";
import { LineSkeleton } from "@/components/skeleton";
import { AlertMessage, DeleteButton } from "@/components/common";

// Shadcn
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const table_link = {
  show: true,
  text: "Add Transaction",
  link: "/transaction/add",
};

const table_filter = {
  placeholder: "symbol",
  field: "symbol",
};

export function TransactionListPage() {
  // Router
  const { transaction_type } = useParams<{ transaction_type: string }>();
  const navigate = useNavigate();

  // Local State
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Query
  const { data, isFetched, error } = useQuery({
    queryKey: [
      TRANSACTION_LIST_QUERY_KEY,
      {
        transaction_type: transaction_type,
      },
    ],
    queryFn: () =>
      transaction_list({
        transaction_type: transaction_type,
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
    <PageLayout>
      <div className="grid grid-cols-1 gap-4">
        <Card className="w-full h-full p-3">
          <CardContent className="p-1">
            {!isFetched && <LineSkeleton count={5} />}

            {error && <AlertMessage message={error.message} />}

            {isFetched && !error && (
              <>
                <div className="flex items-center gap-4">
                  <Select
                    onValueChange={(value: string) => {
                      navigate(`/transaction/${value}`);
                    }}
                    value={transaction_type}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Transaction Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {transaction_type_dropdown.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

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
      </div>
    </PageLayout>
  );
}
