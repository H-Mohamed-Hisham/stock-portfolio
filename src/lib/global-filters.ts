/* eslint-disable @typescript-eslint/no-explicit-any */

export const assetGlobalFilterFn = (
  row: any,
  _columnId: any,
  filterValue: any
) => {
  const symbolMatch = row
    .getValue("symbol")
    .toString()
    .toLowerCase()
    .includes(filterValue.toLowerCase());

  const nameMatch = row
    .getValue("name")
    .toString()
    .toLowerCase()
    .includes(filterValue.toLowerCase());

  const typeMatch = row
    .getValue("type")
    .toString()
    .toLowerCase()
    .includes(filterValue.toLowerCase());

  return symbolMatch || nameMatch || typeMatch;
};

export const transactionGlobalFilterFn = (
  row: any,
  _columnId: any,
  filterValue: any
) => {
  const symbolMatch = row
    .getValue("symbol")
    .toString()
    .toLowerCase()
    .includes(filterValue.toLowerCase());

  const nameMatch = row
    .getValue("name")
    .toString()
    .toLowerCase()
    .includes(filterValue.toLowerCase());

  return symbolMatch || nameMatch;
};
