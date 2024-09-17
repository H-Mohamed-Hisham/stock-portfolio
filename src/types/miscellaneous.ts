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
  transaction_type: TTransactionType;
  shares: number;
  price: number;
  tax: number;
};

// UI Components

export type TAppMenu = {
  label: string;
  link: string;
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

// Error Response

export type TApiError = {
  message: string;
  // error: string;
  statusCode: number;
};
