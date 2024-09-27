import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// API
import {
  fetch_asset_transaction,
  remove_transaction_by_id,
  remove_transactions,
} from "@/api";

// Constants
import {
  FETCH_TRANSACTION_QUERY_KEY,
  FETCH_ASSET_TRANSACTION_QUERY_KEY,
  FETCH_ASSET_STAT_QUERY_KEY,
  FETCH_OVERALL_STAT_QUERY_KEY,
} from "@/constants/query-key";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Lib
import { transactionGlobalFilterFn } from "@/lib/global-filters";

// Columns
import { transaction_columns } from "@/columns";

// Types
import { TApiError, TTransaction, TDeleteDialog } from "@/types";

// Components
import { DataTable, DeleteButton } from "@/components/data-table";
import { LineSkeleton } from "@/components/skeleton";
import { AlertMessage, DeleteAlertDialog } from "@/components/common";

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

  // Hooks
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Local State
  const [singleRowDeleteID, setSingleRowDeleteID] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<(string | undefined)[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<TDeleteDialog>({
    type: null,
    open: false,
  });

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

  // Mutation
  const { mutate: mutate_remove_transaction_by_id } = useMutation({
    mutationFn: (id: string) => remove_transaction_by_id(id),
    onError: (error: TApiError) => {
      setDeleteDialog({
        type: null,
        open: false,
      });
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    },
    onSuccess: () => {
      setDeleteDialog({
        type: null,
        open: false,
      });
      queryClient.invalidateQueries({
        queryKey: [FETCH_TRANSACTION_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [FETCH_ASSET_TRANSACTION_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [FETCH_ASSET_STAT_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [FETCH_OVERALL_STAT_QUERY_KEY],
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
      setDeleteDialog({
        type: null,
        open: false,
      });
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    },
    onSuccess: () => {
      setDeleteDialog({
        type: null,
        open: false,
      });
      queryClient.invalidateQueries({
        queryKey: [FETCH_TRANSACTION_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [FETCH_ASSET_TRANSACTION_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [FETCH_ASSET_STAT_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [FETCH_OVERALL_STAT_QUERY_KEY],
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
    <>
      <Card className="w-full h-full p-3">
        <CardContent className="p-1">
          {!isFetched && <LineSkeleton count={5} />}

          {error && <AlertMessage message={error.message} />}

          {isFetched && !error && (
            <>
              <div className="flex items-center gap-4">
                {selectedRows.length > 0 && (
                  <DeleteButton
                    onClick={() => {
                      setDeleteDialog({
                        type: "bulk",
                        open: true,
                      });
                    }}
                  />
                )}
              </div>

              <DataTable
                columns={transaction_columns(false, (id) => {
                  setSingleRowDeleteID(id);
                  setDeleteDialog({
                    type: "single",
                    open: true,
                  });
                })}
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

      {deleteDialog.open && (
        <DeleteAlertDialog
          deleteDialog={deleteDialog}
          setDeleteDialog={setDeleteDialog}
          deleteCallback={() =>
            deleteDialog.type === "bulk"
              ? handleDeleteSelectedRow()
              : deleteDialog.type === "single"
              ? handleDelete(singleRowDeleteID)
              : {}
          }
        />
      )}
    </>
  );
}
