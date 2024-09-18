// Lib
import {
  default_headers,
  post_request,
  patch_request,
  get_request,
} from "@/lib/http-methods";

// Types
import {
  TOverallStatParam,
  TAssetStatParam,
  TTransactionListParam,
  TTransactionForm,
  TTransactionByIDParam,
} from "@/types";

const api_url = import.meta.env.VITE_API_URL || null;

export const fetch_overall_stat = async (body: TOverallStatParam) => {
  const response = await post_request(
    `${api_url}/transaction/overall-stat`,
    body,
    await default_headers()
  );

  return response;
};

export const fetch_asset_stat = async (body: TAssetStatParam) => {
  const response = await post_request(
    `${api_url}/transaction/asset-stat`,
    body,
    await default_headers()
  );

  return response;
};

export const create_transaction = async (body: TTransactionForm) => {
  const response = await post_request(
    `${api_url}/transaction/create`,
    body,
    await default_headers()
  );

  return response;
};

export const fetch_transaction_by_id = async (body: TTransactionByIDParam) => {
  const response = await get_request(
    `${api_url}/transaction/${body.transaction_id}`,
    {},
    await default_headers()
  );

  return response;
};

export const update_transaction = async (body: TTransactionForm) => {
  const response = await patch_request(
    `${api_url}/transaction/${body.id}`,
    body,
    await default_headers()
  );

  return response;
};

export const fetch_transaction = async (body: TTransactionListParam) => {
  const response = await post_request(
    `${api_url}/transaction/list`,
    body,
    await default_headers()
  );

  return response;
};

export const fetch_asset_transaction = async (body: TAssetStatParam) => {
  const response = await post_request(
    `${api_url}/transaction/asset`,
    body,
    await default_headers()
  );

  return response;
};
