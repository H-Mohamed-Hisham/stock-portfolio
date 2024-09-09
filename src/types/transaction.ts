export type TTransactionType = "buy" | "sell";

export type TTransaction = {
  id: string;
  user_id: string;
  date: string;
  asset_id: string;
  transaction_type: TTransactionType;
  quantity: number;
  price: number;
  tax: number;
  total: number;
};
