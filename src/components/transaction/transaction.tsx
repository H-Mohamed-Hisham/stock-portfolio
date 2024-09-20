import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

// API
import {
  fetch_transaction,
  remove_transaction_by_id,
  remove_transactions,
} from "@/api";

// Constants
import {
  FETCH_TRANSACTION_QUERY_KEY,
  FETCH_ASSET_TRANSACTION_QUERY_KEY,
  FETCH_ASSET_STAT_QUERY_KEY,
} from "@/constants/query-key";
import { transaction_type_dropdown } from "@/constants/dropdown";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Lib
import { transactionGlobalFilterFn } from "@/lib/global-filters";

// Columns
import { transaction_columns } from "@/columns";

// Types
import { TApiError } from "@/types";

// Components
import { DataTable, DeleteButton } from "@/components/data-table";
import { LineSkeleton } from "@/components/skeleton";
import { AlertMessage } from "@/components/common";

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
  text: "Create Transaction",
  link: "/transaction/create",
};

const table_filter = {
  placeholder: "symbol",
  field: "symbol",
  filter_type: "text-input",
};

export function Transaction() {
  // Router
  const { transaction_type } = useParams<{ transaction_type: string }>();
  const navigate = useNavigate();

  // Hooks
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Local State
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Query
  const { data, isFetched, error } = useQuery({
    queryKey: [
      FETCH_TRANSACTION_QUERY_KEY,
      {
        transaction_type: transaction_type,
      },
    ],
    queryFn: () =>
      fetch_transaction({
        transaction_type: transaction_type,
      }),
  });

  // Mutation
  const { mutate: mutate_remove_transaction_by_id } = useMutation({
    mutationFn: (id: string) => remove_transaction_by_id(id),
    onError: (error: TApiError) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FETCH_TRANSACTION_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [FETCH_ASSET_TRANSACTION_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [FETCH_ASSET_STAT_QUERY_KEY],
      });
      toast({
        title: "Success",
        variant: "success",
        description: "Transaction removed successfully",
      });
    },
  });

  const { mutate: mutate_remove_transactions } = useMutation({
    mutationFn: (ids: string[]) =>
      remove_transactions({
        transaction_id: ids,
      }),
    onError: (error: TApiError) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FETCH_TRANSACTION_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [FETCH_ASSET_TRANSACTION_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [FETCH_ASSET_STAT_QUERY_KEY],
      });
      toast({
        title: "Success",
        variant: "success",
        description: "Transaction removed successfully",
      });
    },
  });

  // Handle Selected Rows Change
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectedRowsChange = (rows: any[]) => {
    setSelectedRows(rows);
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    mutate_remove_transaction_by_id(id);
  };

  // Handle Delete Selected Row
  const handleDeleteSelectedRow = () => {
    mutate_remove_transactions(selectedRows);
  };

  return (
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
                columns={transaction_columns(true, handleDelete)}
                data={data}
                link={table_link}
                filter={table_filter}
                row_id_key="id"
                onSelectedRowsChange={handleSelectedRowsChange}
                globalFilterFn={transactionGlobalFilterFn}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
