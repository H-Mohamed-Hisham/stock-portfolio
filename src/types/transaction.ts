// Types
import { TAsset } from "@/types";

export type TOverallStatParam = {
  asset_type: string;
};

export type TAssetStatParam = {
  asset_id: string | undefined;
};

export type TTransactionListParam = {
  transaction_type: string | undefined;
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

export type TTransactionForm = {
  date: Date;
  asset_id: string;
  transaction_type: string;
  quantity: number;
  price: number;
  tax: number;
  total?: number;
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
