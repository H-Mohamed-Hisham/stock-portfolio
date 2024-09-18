// Lib
import { default_headers, post_request } from "@/lib/http-methods";

// Types
import {
  TOverallStatParam,
  TAssetStatParam,
  TTransactionListParam,
  TTransactionForm,
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

export const fetch_transaction = async (body: TTransactionListParam) => {
  const response = await post_request(
    `${api_url}/transaction/list`,
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

export const fetch_asset_transaction = async (body: TAssetStatParam) => {
  const response = await post_request(
    `${api_url}/transaction/asset/${body.asset_id}`,
    {},
    await default_headers()
  );

  return response;
};
