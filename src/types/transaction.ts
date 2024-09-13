export type TTransactionType = "buy" | "sell";

export type TOverallProfitLossParam = {
  asset_type: string;
};

export type TAssetProfitLossParam = {
  asset_id: string;
};

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

export type TOverallProfitLoss = {
  invested: number;
  returns: number;
  quantity_bought: number;
  quantity_sold: number;
  quantity_holding: number;
  profit_loss_amount: number;
  profit_loss_status: string;
};

export type TAssetProfitLoss = {
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

export type TProfitLossChartData = {
  symbol: string;
  invested?: number;
  returns?: number;
};
