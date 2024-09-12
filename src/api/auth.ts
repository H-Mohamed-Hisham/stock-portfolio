// Lib
import { default_headers, post_request } from "@/lib/http-methods";

// Types
import { TSignIn } from "@/types";

const api_url = import.meta.env.VITE_API_URL || null;

export const sign_in = async (body: TSignIn) => {
  const { data } = await post_request(
    `${api_url}/auth/sign-in`,
    body,
    await default_headers()
  );

  return data;
};
