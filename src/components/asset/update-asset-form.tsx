import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

// API
import { fetch_asset_by_id, update_asset } from "@/api";

// Types
import { TLabelValue, TAssetForm, TAsset, TApiError } from "@/types";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Constants
import { asset_type_dropdown } from "@/constants/dropdown";
import {
  FETCH_TRANSACTION_QUERY_KEY,
  FETCH_ASSET_BY_ID_QUERY_KEY,
} from "@/constants/query-key";

// Shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UpdateAssetForm() {
  // Router
  const { asset_id } = useParams<{ asset_id: string }>();

  // Hooks
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Form Initial Value
  const initialValue: TAssetForm = {
    name: "",
    symbol: "",
    type: "stock",
  };

  // Form Schema
  const schema = yup.object().shape({
    name: yup.string().required(),
    symbol: yup.string().required(),
    type: yup.string().required(),
  });

  // Form Hook
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });

  const { setValue } = form;

  // Query - Fetch Transaction By ID
  const {
    data: asset_data,
    isFetched: is_asset_fetched,
    error: asset_error,
  } = useQuery({
    queryKey: [FETCH_ASSET_BY_ID_QUERY_KEY, asset_id],
    queryFn: () => fetch_asset_by_id(asset_id),
  });

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: ({ name, symbol, type }: TAssetForm) =>
      update_asset({
        id: asset_id,
        name,
        symbol,
        type,
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
      toast({
        title: "Success",
        variant: "success",
        description: "Asset updated successfully",
      });
    },
  });

  // Submit Handler
  const onSubmit = (data: TAssetForm) => {
    mutate({
      name: data.name,
      symbol: data.symbol,
      type: data.type,
    });
  };

  // UseEffect - Set Form Value
  useEffect(() => {
    if (is_asset_fetched && asset_data) {
      const { name, symbol, type }: TAsset = asset_data;

      setValue("name", name);
      setValue("symbol", symbol);
      setValue("type", type);
    }
  }, [is_asset_fetched, asset_data, setValue]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Symbol */}
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Symbol</FormLabel>
              <FormControl>
                <Input placeholder="Symbol" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Asset Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {asset_type_dropdown.map(
                    (item: TLabelValue, index: number) => (
                      <SelectItem key={index} value={item.value}>
                        {item.label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="default"
          type="submit"
          className="font-semibold"
          disabled={
            !is_asset_fetched || asset_error || isPending ? true : false
          }
        >
          {isPending ? "Submitting..." : "Submit"}
        </Button>

        <Button asChild variant="destructive" className="font-semibold">
          {isPending ? "Cancel" : <Link to="/asset">Cancel</Link>}
        </Button>
      </form>
    </Form>
  );
}
