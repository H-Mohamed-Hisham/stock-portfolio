// Types
import { TTransactionType } from "@/types";

// Formatters

export type TFormatNumber = {
  value?: number;
  show_rupee_symbol?: boolean;
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
