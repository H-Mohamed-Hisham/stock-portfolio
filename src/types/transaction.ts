// Types
import { TAsset } from "@/types";

export type TTransactionType = "buy" | "sell";

export type TOverallStatParam = {
  asset_type: string;
};

export type TAssetStatParam = {
  asset_id: string;
};

export type TTransactionListParam = {
  transaction_type: string | undefined;
};

export type TTransaction = {
  id?: string;
  user_id?: string;
  date: string | Date;
  asset_id: string;
  transaction_type: TTransactionType;
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
