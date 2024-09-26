import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

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
import {
  transaction_type_dropdown,
  asset_type_dropdown,
} from "@/constants/dropdown";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Lib
import { transactionGlobalFilterFn } from "@/lib/global-filters";

// Columns
import { transaction_columns } from "@/columns";

// Types
import { TApiError, TTransaction } from "@/types";

// Components
import { DataTable, DeleteButton } from "@/components/data-table";
import { LineSkeleton } from "@/components/skeleton";
import { AlertMessage, DeleteAlertDialog } from "@/components/common";

// Shadcn
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
  placeholder: "symbol, name",
  field: "symbol",
  filter_type: "text-input",
};

export function Transaction() {
  // Router
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const transaction_type = queryParams.get("transaction_type") ?? "all";
  const asset_type = queryParams.get("asset_type") ?? "all";

  // Hooks
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Local State
  const [selectedRows, setSelectedRows] = useState<(string | undefined)[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  // Query
  const { data, isFetched, error } = useQuery({
    queryKey: [
      FETCH_TRANSACTION_QUERY_KEY,
      {
        transaction_type: transaction_type,
        asset_type: asset_type,
      },
    ],
    queryFn: () =>
      fetch_transaction({
        transaction_type: transaction_type,
        asset_type: asset_type,
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
      setShowDeleteDialog(false);
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
  const handleSelectedRowsChange = (rows: TTransaction[]) => {
    const _rows = rows?.map((item: TTransaction) => item.id);
    setSelectedRows(_rows);
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    mutate_remove_transaction_by_id(id);
  };

  // Handle Delete Selected Row
  const handleDeleteSelectedRow = () => {
    const filteredSelectedRows = selectedRows.filter(
      (row): row is string => row !== undefined
    );
    mutate_remove_transactions(filteredSelectedRows);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="w-full h-full p-3">
        <CardContent className="p-1">
          {!isFetched && <LineSkeleton count={5} />}

          {error && <AlertMessage message={error.message} />}

          {isFetched && !error && (
            <>
              <div className="flex flex-wrap items-end gap-4">
                <div className="space-y-2">
                  <Label className="ml-1">Filter By Transaction Type :</Label>
                  <Select
                    onValueChange={(value: string) => {
                      queryParams.set("transaction_type", value);
                      const newSearch = `?${queryParams.toString()}`;
                      navigate({ search: newSearch });
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
                </div>

                <div className="space-y-2">
                  <Label className="ml-1">Filter By Asset Type :</Label>
                  <Select
                    onValueChange={(value: string) => {
                      queryParams.set("asset_type", value);
                      const newSearch = `?${queryParams.toString()}`;
                      navigate({ search: newSearch });
                    }}
                    value={asset_type}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Asset Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {asset_type_dropdown.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedRows.length > 0 && (
                  <DeleteButton
                    onClick={() => {
                      setShowDeleteDialog(true);
                      // handleDeleteSelectedRow();
                    }}
                  />
                )}
              </div>

              <DataTable
                columns={transaction_columns(true, handleDelete)}
                data={data}
                link={table_link}
                filter={table_filter}
                onSelectedRowsChange={handleSelectedRowsChange}
                globalFilterFn={transactionGlobalFilterFn}
              />
            </>
          )}
        </CardContent>
      </Card>

      {showDeleteDialog && (
        <DeleteAlertDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          deleteCallback={() => handleDeleteSelectedRow()}
        />
      )}
    </div>
  );
}
