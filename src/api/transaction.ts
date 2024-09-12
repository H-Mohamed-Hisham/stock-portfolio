// Lib
import { default_headers, post_request } from "@/lib/http-methods";

// Types
import { TOverallProfitLossForm } from "@/types";

type test = {
  key: string;
  body: TOverallProfitLossForm;
}[];

const api_url = import.meta.env.VITE_API_URL || null;

export const overall_profit_loss = async (queryKey: test) => {
  const [key, body] = queryKey;

  console.log(key);

  const response = await post_request(
    `${api_url}/transaction/overall-profit-loss`,
    body,
    await default_headers()
  );

  return response;
};
