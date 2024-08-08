// Stock

export type TStock = {
  stock_id: string;
  stock_symbol: string;
  stock_name: string;
};

export type TStockTransaction = {
  transaction_id?: string;
  user_id?: string;
  stock_id: string;
  transaction_type: string;
  date: Date | string;
  shares: number;
  price: number;
  tax: number;
  total: number;
  stock?: TStock;
};

export type TStockProfitLoss = {
  stock_name: string;
  stock_symbol: string;
  total_shares: number;
  total_invested: number;
  total_returns: number;
  profit_loss_amount: number;
  profit_loss_status: string;
};

export type TStockInvestReturnChartData = {
  stock: string;
  invested: number;
  returns: number;
};

export type TStockInvestReturnChartConfig = {
  invested: {
    label: string;
    color: string;
  };
  returns: {
    label: string;
    color: string;
  };
};

// Miscellaneous

export type TLabelValue = {
  label: string;
  value: string;
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
