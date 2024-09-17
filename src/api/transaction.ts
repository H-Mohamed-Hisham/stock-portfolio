// Lib
import { default_headers, post_request } from "@/lib/http-methods";

// Types
import {
  TOverallStatParam,
  TAssetStatParam,
  TTransactionListParam,
} from "@/types";

const api_url = import.meta.env.VITE_API_URL || null;

export const overall_stat = async (body: TOverallStatParam) => {
  const response = await post_request(
    `${api_url}/transaction/overall-stat`,
    body,
    await default_headers()
  );

  return response;
};

export const asset_stat = async (body: TAssetStatParam) => {
  const response = await post_request(
    `${api_url}/transaction/asset-stat`,
    body,
    await default_headers()
  );

  return response;
};

export const transaction_list = async (body: TTransactionListParam) => {
  const response = await post_request(
    `${api_url}/transaction/list`,
    body,
    await default_headers()
  );

  return response;
};
