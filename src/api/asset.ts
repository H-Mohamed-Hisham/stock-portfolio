// Lib
import {
  default_headers,
  get_request,
  delete_request,
  post_request,
  patch_request,
} from "@/lib/http-methods";

// Types
import { TAssetForm } from "@/types";

const api_url = import.meta.env.VITE_API_URL || null;

export const fetch_asset = async () => {
  const response = await get_request(
    `${api_url}/asset`,
    {},
    await default_headers()
  );

  return response;
};

export const fetch_asset_by_id = async (asset_id: string | undefined) => {
  const response = await get_request(
    `${api_url}/asset/${asset_id}`,
    {},
    await default_headers()
  );

  return response;
};

export const remove_asset_by_id = async (asset_id: string) => {
  const response = await delete_request(
    `${api_url}/asset/${asset_id}`,
    await default_headers()
  );

  return response;
};

export const create_asset = async (body: TAssetForm) => {
  const response = await post_request(
    `${api_url}/asset`,
    body,
    await default_headers()
  );

  return response;
};

export const update_asset = async (body: TAssetForm) => {
  const response = await patch_request(
    `${api_url}/asset/${body.id}`,
    body,
    await default_headers()
  );

  return response;
};
