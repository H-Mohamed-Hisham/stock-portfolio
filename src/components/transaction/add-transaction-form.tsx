import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  // useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
// import dayjs from "dayjs";

// Lib
// import { cn } from "@/lib/utils";
// import { calculate_total } from "@/lib/calculations";
// import { formatDateToISO } from "@/lib/formatters";

// API
import { fetch_asset } from "@/api";

// Types
import { TLabelValue, TTransaction, TAsset } from "@/types";

// Shadcn
// import { Calendar } from "@/components/ui/calendar";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddTransactionForm() {
  // Hooks
  const queryClient = useQueryClient();
  console.log("queryClient :: ", queryClient);

  // Local State
  const [stocksDropdown, setStocksDropdown] = useState<TLabelValue[]>([]);

  // Form Initial Value
  const initialValue: TTransaction = {
    date: new Date(),
    asset_id: "",
    transaction_type: "buy",
    quantity: 0,
    price: 0,
    tax: 0,
    total: 0,
  };

  // Form Schema
  const schema = yup.object().shape({
    // date: yup.date().required(),
    asset_id: yup.string().required(),
    transaction_type: yup.string().required(),
    quantity: yup.number().required(),
    price: yup.number().required(),
    tax: yup.number().required(),
    total: yup.number().required(),
  });

  // Query
  const { data, isSuccess } = useQuery({
    queryKey: ["FETCH_ASSET"],
    queryFn: fetch_asset,
  });

  // Form Hook
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });

  // Submit Handler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
    form.reset();
  };

  // UseEffect
  useEffect(() => {
    if (isSuccess && Array.isArray(data)) {
      setStocksDropdown(
        data?.map((item: TAsset) => ({
          label: item?.name,
          value: item?.id,
        }))
      );

      form.setValue("asset_id", data?.[0]?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        <FormField
          control={form.control}
          name="asset_id"
          render={({ field }) => (
            <FormItem key={field.value}>
              <FormLabel>Stock</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Asset" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stocksDropdown.map((item: TLabelValue, index: number) => (
                    <SelectItem key={index} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="asset_id"
          render={({ field }) => (
            <FormItem key={field.value}>
              <FormLabel>Stock</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Asset" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stocksDropdown.map((item: TLabelValue, index: number) => (
                    <SelectItem key={index} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
