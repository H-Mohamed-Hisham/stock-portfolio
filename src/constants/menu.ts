// Main Navigation

export const navbar_menu = [
  { name: "Stock", href: "/stock" },
  { name: "Index", href: "/index" },
];

export const navbar_transaction_menu = [
  {
    name: "Stock",
    href: "/transaction/stock",
  },
  {
    name: "Option",
    href: "/transaction/option",
  },
];

// Page Level Navigation Tabs

export const stock_menu_tabs = [
  {
    label: "Transactions",
    value: "/transaction/stock",
  },
  {
    label: "Holdings",
    value: "/transaction/stock/holding",
  },
  {
    label: "Profit/Loss",
    value: "/transaction/stock/profit-loss",
  },
];
