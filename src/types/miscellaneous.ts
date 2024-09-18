// Types
import { TTransactionType } from "@/types";

// Formatters

export type TFormatNumber = {
  value?: number;
  show_rupee_symbol?: boolean;
  show_decimal_point?: boolean;
};

export type TFormatDate = {
  date: string;
};

// Calculation

export type TCalculation = {
  transaction_type: string;
  quantity: number;
  price: number;
  tax: number;
};

// UI Components

export type TAppMenu = {
  label: string;
  link: string;
  base_link: string;
  icon: React.ReactNode;
};

export type TLabelValue = {
  label: string;
  value: string;
};

export type TSkeleton = {
  count?: number;
};

export type TAlertMessage = {
  variant?: "default" | "destructive" | "success" | null | undefined;
  message: string;
};

export type TDataTableCell = {
  cellAlign: string;
  children: React.ReactNode;
};

export type TDataTableLink = {
  show: boolean;
  text: string;
  link: string;
};

export type TDataTableFilter = {
  placeholder: string;
  field: string;
};

// Error Response

export type TApiError = {
  message: string;
  // error: string;
  statusCode: number;
};
