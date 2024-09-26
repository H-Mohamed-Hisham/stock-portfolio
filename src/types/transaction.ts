// Types
import { TAsset } from "@/types";

// Payload

export type TOverallStatPayload = {
  asset_type: string;
};

export type TAssetStatPayload = {
  asset_id: string | undefined;
};

export type TTransactionListPayload = {
  transaction_type: string;
  asset_type: string;
};

export type TRemoveTransactionsPayload = {
  transaction_id: string[];
};

export type TTransactionPayload = {
  id?: string;
  date: Date;
  asset_id: string;
  transaction_type: string;
  quantity: number;
  price: number;
  tax: number;
  total?: number;
};

export type TTransaction = {
  id?: string;
  user_id?: string;
  date: Date | string;
  asset_id: string;
  transaction_type: string;
  quantity: number;
  price: number;
  tax: number;
  total: number;
  asset?: TAsset;
};

export type TStat = {
  name: string;
  symbol: string;
  invested: number;
  returns: number;
  quantity_bought: number;
  quantity_sold: number;
  quantity_holding: number;
  profit_loss_amount: number;
  profit_loss_status: string;
};
