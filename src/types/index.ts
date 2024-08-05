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

export type TDropdown = {
  label: string;
  value: string;
};
