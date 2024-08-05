export type TStock = {
  stock_id: string;
  stock_symbol: string;
  stock_name: string;
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
