import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// API
import { fetch_asset, remove_asset_by_id } from "@/api";

// Constants
import { FETCH_ASSET_QUERY_KEY } from "@/constants/query-key";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Lib
import { assetGlobalFilterFn } from "@/lib/global-filters";

// Columns
import { asset_columns } from "@/columns";

// Types
import { TApiError } from "@/types";

// Components
import { DataTable } from "@/components/data-table";
import { LineSkeleton } from "@/components/skeleton";
import { AlertMessage } from "@/components/common";

// Shadcn
import { Card, CardContent } from "@/components/ui/card";

const table_link = {
  show: true,
  text: "Create Asset",
  link: "/asset/create",
};

const table_filter = {
  placeholder: "symbol, name & type",
  field: "symbol",
  filter_type: "text-input",
};

export function Asset() {
  // Hooks
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Query
  const { data, isFetched, error } = useQuery({
    queryKey: [FETCH_ASSET_QUERY_KEY],
    queryFn: () => fetch_asset(),
  });

  // Mutation
  const { mutate: mutate_remove_transaction_by_id } = useMutation({
    mutationFn: (id: string) => remove_asset_by_id(id),
    onError: (error: TApiError) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FETCH_ASSET_QUERY_KEY],
      });
      toast({
        title: "Success",
        variant: "success",
        description: "Asset removed successfully",
      });
    },
  });

  // Handle Delete
  const handleDelete = (id: string) => {
    mutate_remove_transaction_by_id(id);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="w-full h-full p-3">
        <CardContent className="p-1">
          {!isFetched && <LineSkeleton count={5} />}

          {error && <AlertMessage message={error.message} />}

          {isFetched && !error && (
            <DataTable
              columns={asset_columns(handleDelete)}
              data={data}
              link={table_link}
              filter={table_filter}
              globalFilterFn={assetGlobalFilterFn}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
