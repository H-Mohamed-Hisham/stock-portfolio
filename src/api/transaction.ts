// Lib
import {
  default_headers,
  post_request,
  patch_request,
  get_request,
  delete_request,
} from "@/lib/http-methods";

// Types
import {
  TOverallStatPayload,
  TAssetStatPayload,
  TTransactionListPayload,
  TTransactionPayload,
  TRemoveTransactionsPayload,
} from "@/types";

const api_url = import.meta.env.VITE_API_URL || null;

export const fetch_overall_stat = async (body: TOverallStatPayload) => {
  const response = await post_request(
    `${api_url}/transaction/overall-stat`,
    body,
    await default_headers()
  );

  return response;
};

export const fetch_asset_stat = async (body: TAssetStatPayload) => {
  const response = await post_request(
    `${api_url}/transaction/asset-stat`,
    body,
    await default_headers()
  );

  return response;
};

export const create_transaction = async (body: TTransactionPayload) => {
  const response = await post_request(
    `${api_url}/transaction/create`,
    body,
    await default_headers()
  );

  return response;
};

export const fetch_transaction_by_id = async (
  transaction_id: string | undefined
) => {
  const response = await get_request(
    `${api_url}/transaction/${transaction_id}`,
    {},
    await default_headers()
  );

  return response;
};

export const update_transaction = async (body: TTransactionPayload) => {
  const response = await patch_request(
    `${api_url}/transaction/${body.id}`,
    body,
    await default_headers()
  );

  return response;
};

export const remove_transaction_by_id = async (transaction_id: string) => {
  const response = await delete_request(
    `${api_url}/transaction/${transaction_id}`,
    await default_headers()
  );

  return response;
};

export const remove_transactions = async (body: TRemoveTransactionsPayload) => {
  const response = await post_request(
    `${api_url}/transaction/remove`,
    body,
    await default_headers()
  );

  return response;
};

export const fetch_transaction = async (body: TTransactionListPayload) => {
  const response = await post_request(
    `${api_url}/transaction/list`,
    body,
    await default_headers()
  );

  return response;
};

export const fetch_asset_transaction = async (body: TAssetStatPayload) => {
  const response = await post_request(
    `${api_url}/transaction/asset`,
    body,
    await default_headers()
  );

  return response;
};
