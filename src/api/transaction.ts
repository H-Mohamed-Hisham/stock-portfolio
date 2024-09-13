// Lib
import { default_headers, post_request } from "@/lib/http-methods";

// Types
import { TOverallProfitLossParam } from "@/types";

const api_url = import.meta.env.VITE_API_URL || null;

export const overall_profit_loss = async (body: TOverallProfitLossParam) => {
  const response = await post_request(
    `${api_url}/transaction/overall-profit-loss`,
    body,
    await default_headers()
  );

  return response;
};
