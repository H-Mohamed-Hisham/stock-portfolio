"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@tanstack/react-query";

// Icons
import { CalendarIcon } from "lucide-react";

// Lib
import { cn } from "@/lib/utils";

// Helpers
import { calculateTotal } from "@/lib/calculation";
import { formatDateTime } from "@/lib/formatter";

// Constants
import { FETCH_ALL_STOCK, ADD_STOCK_TRANSACTION } from "@/constants/query-key";
import { transaction_type_dropdown } from "@/constants/dropdown";

// Types
import { TStock, TDropdown, TStockTransaction } from "@/types";

// Rest API
import { fetchAllStock } from "@/rest-api/stock";
import { addStockTransaction } from "@/rest-api/stock-transaction";

// Components - Shadcn
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

const FormSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
  stock_id: z.string().min(1, { message: "Stock is required" }),
  transaction_type: z
    .string()
    .min(1, { message: "Transaction type is required" }),
  shares: z.coerce
    .number({
      message: "Only number is allowed",
    })
    .min(1)
    .int()
    .gte(0),
  price: z.coerce
    .number({
      message: "Only number is allowed",
    })
    .multipleOf(0.01),
  tax: z.coerce
    .number({
      message: "Only number is allowed",
    })
    .multipleOf(0.01),
  total: z.coerce
    .number({
      message: "Only number is allowed",
    })
    .multipleOf(0.01),
});

export type FormType = z.infer<typeof FormSchema>;

export const AddStockTransactionForm = () => {
  // Local State
  const [stocksDropdown, setStocksDropdown] = useState<TDropdown[]>([]);

  // Query
  const { data, isSuccess }: any = useQuery({
    queryKey: [FETCH_ALL_STOCK],
    queryFn: fetchAllStock,
  });

  // Mutation
  const mutation = useMutation({
    mutationFn: ({
      stock_id,
      transaction_type,
      date,
      shares,
      price,
      tax,
      total,
    }: TStockTransaction) =>
      addStockTransaction([
        ADD_STOCK_TRANSACTION,
        {
          stock_id,
          transaction_type,
          date,
          shares,
          price,
          tax,
          total,
        },
      ]),
    onError: (error: any) => {
      console.log("Error :: ", error?.response?.data);
    },
    onSuccess: (response: any) => {
      //   toast.success(response?.message);
      //   formik.resetForm();
      console.log("RES :: ", response?.message);
    },
  });

  // Form
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      transaction_type: "Buy",
      shares: 0,
      price: 0,
      tax: 0,
      total: 0,
    },
  });

  // Form Watch
  const { setValue, watch } = form;
  const shares = watch("shares");
  const price = watch("price");
  const tax = watch("tax");

  // Form Submit
  const onSubmit = (data: any) => {
    alert("TTT");
    console.log(data);
    //  mutation.mutate({
    //    stock_id: data.stock_id,
    //    transaction_type: data.transaction_type,
    //    date: formatDateTime(data.date || "current_date_time"),
    //    shares: data.shares,
    //    price: data.price,
    //    tax: data.tax,
    //    total: data.total,
    //  });
  };

  // UseEffect - Calculate Total
  useEffect(() => {
    if (shares && price && tax !== undefined) {
      const total = calculateTotal({ shares, price, tax });
      setValue("total", total);
    }
  }, [shares, price, tax, setValue]);

  // UseEffect - Set Stocks Dropdown
  useEffect(() => {
    if (isSuccess && Array.isArray(data)) {
      setStocksDropdown(
        data?.map((item: TStock) => ({
          label: item?.stock_name,
          value: item?.stock_id,
        }))
      );
    }
  }, [isSuccess, data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid col-start-1 col-span-full lg:col-start-4 lg:col-span-6 gap-y-4">
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
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
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
              </FormItem>
            )}
          />

          {/* Stock ID */}
          <FormField
            control={form.control}
            name="stock_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Stock" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stocksDropdown.map((item: TDropdown, index: number) => (
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Transaction Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {transaction_type_dropdown.map(
                      (item: TDropdown, index: number) => (
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

          {/* Shares */}
          <FormField
            control={form.control}
            name="shares"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shares</FormLabel>
                <FormControl>
                  <Input placeholder="Shares" {...field} />
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
        </div>
      </form>
    </Form>
  );
};
