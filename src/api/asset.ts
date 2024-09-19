// Lib
import { default_headers, get_request } from "@/lib/http-methods";

const api_url = import.meta.env.VITE_API_URL || null;

export const fetch_asset = async () => {
  const response = await get_request(
    `${api_url}/asset`,
    {},
    await default_headers()
  );

  return response;
};
