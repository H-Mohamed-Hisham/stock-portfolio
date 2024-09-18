import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import clsx from "clsx";

// Icons
import { CalendarIcon } from "lucide-react";

// Lib
import { calculate_total } from "@/lib/calculations";

// API
import { fetch_asset, create_transaction } from "@/api";

// Types
import { TLabelValue, TTransactionForm, TAsset, TApiError } from "@/types";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Constants
import { transaction_type_dropdown } from "@/constants/dropdown";
import {
  FETCH_ASSET_QUERY_KEY,
  FETCH_TRANSACTION_QUERY_KEY,
} from "@/constants/query-key";

// Shadcn
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CreateTransactionForm() {
  // Hooks
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Local State
  const [stocksDropdown, setStocksDropdown] = useState<TLabelValue[]>([]);

  // Form Initial Value
  const initialValue: TTransactionForm = {
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
    date: yup.date().required(),
    asset_id: yup.string().required(),
    transaction_type: yup.string().required(),
    quantity: yup.number().positive().typeError("Must be a number").required(),
    price: yup.number().positive().typeError("Must be a number").required(),
    tax: yup.number().positive().typeError("Must be a number").required(),
    total: yup.number().optional(),
  });

  // Form Hook
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });

  const { setValue, watch } = form;
  const transaction_type = watch("transaction_type");
  const quantity = watch("quantity");
  const price = watch("price");
  const tax = watch("tax");

  // Query
  const { data, isSuccess } = useQuery({
    queryKey: [FETCH_ASSET_QUERY_KEY],
    queryFn: fetch_asset,
  });

  // Mutation
  const { mutate } = useMutation({
    mutationFn: ({
      asset_id,
      transaction_type,
      date,
      quantity,
      price,
      tax,
    }: TTransactionForm) =>
      create_transaction({
        asset_id,
        transaction_type,
        date,
        quantity,
        price,
        tax,
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
      setValue("asset_id", data?.[0]?.id);
      queryClient.invalidateQueries({
        queryKey: [FETCH_TRANSACTION_QUERY_KEY],
      });
      toast({
        title: "Success",
        variant: "success",
        description: "Transaction created successfully",
      });
    },
  });

  // Submit Handler
  const onSubmit = (data: TTransactionForm) => {
    console.log(data);
    mutate({
      asset_id: data.asset_id,
      transaction_type: data.transaction_type,
      date: data.date,
      quantity: data.quantity,
      price: data.price,
      tax: data.tax,
    });
    form.reset();
  };

  // UseEffect - Calculate Total
  useEffect(() => {
    if (quantity && price && tax !== undefined) {
      const total = calculate_total({ transaction_type, quantity, price, tax });
      setValue("total", total);
    }
  }, [transaction_type, quantity, price, tax, setValue]);

  // UseEffect - Asset Dropdown Value
  useEffect(() => {
    if (isSuccess && Array.isArray(data)) {
      setStocksDropdown(
        data?.map((item: TAsset) => ({
          label: item?.name,
          value: item?.id,
        }))
      );

      setValue("asset_id", data?.[0]?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        {/* Date */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={clsx("w-full pl-3 text-left font-normal", {
                        "text-muted-foreground": !field.value,
                      })}
                    >
                      {field.value ? (
                        dayjs(field.value).format("DD-MM-YYYY")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    // initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Asset */}
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

        {/* Transaction type */}
        <FormField
          control={form.control}
          name="transaction_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Transaction Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transaction_type_dropdown
                    .filter((f) => f.value !== "all")
                    .map((item: TLabelValue, index: number) => (
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

        {/* Shares */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="quantity" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tax */}
        <FormField
          control={form.control}
          name="tax"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax</FormLabel>
              <FormControl>
                <Input placeholder="tax" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Total */}
        <FormField
          control={form.control}
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total</FormLabel>
              <FormControl>
                <Input placeholder="total" {...field} readOnly />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-primary text-primary-foreground font-semibold"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
