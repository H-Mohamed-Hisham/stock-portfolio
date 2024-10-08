import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import clsx from "clsx";
import { Link, useParams } from "react-router-dom";

// Icons
import { Check, ChevronsUpDown, CalendarIcon } from "lucide-react";

// Lib
import { calculate_total } from "@/lib/calculations";

// API
import {
  fetch_asset,
  fetch_transaction_by_id,
  update_transaction,
} from "@/api";

// Types
import {
  TTransactionPayload,
  TAsset,
  TApiError,
  TAssetDropdown,
  TLabelValue,
} from "@/types";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Constants
import { transaction_type_dropdown } from "@/constants/dropdown";
import {
  FETCH_ASSET_QUERY_KEY,
  FETCH_TRANSACTION_QUERY_KEY,
  FETCH_TRANSACTION_BY_ID_QUERY_KEY,
} from "@/constants/query-key";
import { TRANSACTION_URL } from "@/constants/routes";

// Shadcn
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export function UpdateTransactionForm() {
  // Router
  const { transaction_id } = useParams<{ transaction_id: string }>();

  // Hooks
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Local State
  const [assetDropdown, setAssetDropdown] = useState<TAssetDropdown[]>([]);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  // Form Initial Value
  const initialValue: TTransactionPayload = {
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

  // Query - Fetch Asset
  const { data, isSuccess } = useQuery({
    queryKey: [FETCH_ASSET_QUERY_KEY],
    queryFn: fetch_asset,
  });

  // Query - Fetch Transaction By ID
  const {
    data: transaction_data,
    isFetched: is_transaction_fetched,
    error: transaction_error,
  } = useQuery({
    queryKey: [FETCH_TRANSACTION_BY_ID_QUERY_KEY, transaction_id],
    queryFn: () => fetch_transaction_by_id(transaction_id),
  });

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      asset_id,
      transaction_type,
      date,
      quantity,
      price,
      tax,
    }: TTransactionPayload) =>
      update_transaction({
        id: transaction_id,
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
      // form.reset();
      // setValue("asset_id", data?.[0]?.id);
      queryClient.invalidateQueries({
        queryKey: [FETCH_TRANSACTION_QUERY_KEY],
      });
      toast({
        title: "Success",
        variant: "success",
        description: "Transaction updated successfully",
      });
    },
  });

  // Submit Handler
  const onSubmit = (data: TTransactionPayload) => {
    mutate({
      asset_id: data.asset_id,
      transaction_type: data.transaction_type,
      date: data.date,
      quantity: data.quantity,
      price: data.price,
      tax: data.tax,
    });
  };

  // UseEffect - Calculate Total
  useEffect(() => {
    if (transaction_type && quantity && price && tax) {
      const total = calculate_total({ transaction_type, quantity, price, tax });
      setValue("total", total);
    }
  }, [transaction_type, quantity, price, tax, setValue]);

  // UseEffect - Set Form Value
  useEffect(() => {
    if (
      is_transaction_fetched &&
      transaction_data &&
      Array.isArray(assetDropdown)
    ) {
      const {
        asset_id,
        transaction_type,
        date,
        quantity,
        price,
        tax,
        total,
      }: TTransactionPayload = transaction_data;

      setValue("asset_id", asset_id);
      setValue("transaction_type", transaction_type);
      setValue("date", date);
      setValue("quantity", quantity);
      setValue("price", price);
      setValue("tax", tax);
      setValue("total", total);
    }
  }, [transaction_data, is_transaction_fetched, setValue, assetDropdown]);

  // UseEffect - Set Asset Dropdown
  useEffect(() => {
    if (isSuccess && Array.isArray(data)) {
      setAssetDropdown(
        data?.map((item: TAsset) => ({
          label: item?.name,
          value: item?.id,
          type: item?.type,
        }))
      );
    }
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
              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={clsx("w-full pl-3 text-left font-normal", {
                        "text-muted-foreground": !field.value,
                      })}
                    >
                      {field.value ? (
                        dayjs(field.value).format("DD-MMM-YYYY")
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
                    initialFocus
                    selected={field.value}
                    // onSelect={field.onChange}
                    onSelect={(value) => {
                      form.setValue(
                        "date",
                        value === undefined ? new Date() : value
                      );
                      setShowCalendar(false);
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
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
              <FormLabel>Asset</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={clsx("w-full justify-between", {
                        "text-muted-foreground": !field.value,
                      })}
                    >
                      {field.value
                        ? assetDropdown.find(
                            (asset: TAssetDropdown) =>
                              asset.value === field.value
                          )?.label
                        : "Select asset"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search asset..." />
                    <CommandList>
                      <CommandEmpty>No asset found</CommandEmpty>
                      <CommandGroup heading="Stock">
                        {assetDropdown
                          .filter((f: TAssetDropdown) => f.type === "stock")
                          .map((asset: TAssetDropdown) => (
                            <CommandItem
                              value={asset.label}
                              key={asset.value}
                              onSelect={() => {
                                form.setValue("asset_id", asset.value);
                              }}
                            >
                              <Check
                                className={clsx(
                                  "mr-2 h-4 w-4",
                                  {
                                    "opacity-100": asset.value === field.value,
                                  },
                                  {
                                    "opacity-0": asset.value !== field.value,
                                  }
                                )}
                              />
                              {asset.label}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup heading="Index">
                        {assetDropdown
                          .filter((f: TAssetDropdown) => f.type === "index")
                          .map((asset: TAssetDropdown) => (
                            <CommandItem
                              value={asset.label}
                              key={asset.value}
                              onSelect={() => {
                                form.setValue("asset_id", asset.value);
                              }}
                            >
                              <Check
                                className={clsx(
                                  "mr-2 h-4 w-4",
                                  {
                                    "opacity-100": asset.value === field.value,
                                  },
                                  {
                                    "opacity-0": asset.value !== field.value,
                                  }
                                )}
                              />
                              {asset.label}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

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
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-row space-x-3"
              >
                {transaction_type_dropdown
                  .filter((f) => f.value !== "all")
                  .map((item: TLabelValue, index: number) => (
                    <FormItem
                      key={index}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={item.value} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  ))}
              </RadioGroup>

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
          variant="default"
          type="submit"
          className="font-semibold"
          disabled={
            !is_transaction_fetched || transaction_error || isPending
              ? true
              : false
          }
        >
          {isPending ? "Submitting..." : "Submit"}
        </Button>

        <Button asChild variant="destructive" className="font-semibold">
          {isPending ? "Cancel" : <Link to={TRANSACTION_URL}>Cancel</Link>}
        </Button>
      </form>
    </Form>
  );
}
