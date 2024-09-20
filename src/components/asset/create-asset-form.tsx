import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

// API
import { create_asset } from "@/api";

// Types
import { TLabelValue, TAssetForm, TApiError } from "@/types";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Constants
import { asset_type_dropdown } from "@/constants/dropdown";
import { FETCH_ASSET_QUERY_KEY } from "@/constants/query-key";

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

export function CreateAssetForm() {
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

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: ({ name, symbol, type }: TAssetForm) =>
      create_asset({
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
      form.reset();
      queryClient.invalidateQueries({
        queryKey: [FETCH_ASSET_QUERY_KEY],
      });
      toast({
        title: "Success",
        variant: "success",
        description: "Asset created successfully",
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        {/* Price */}
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

        {/* Price */}
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

        {/* Transaction type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          disabled={isPending}
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
