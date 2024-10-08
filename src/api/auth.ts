// Lib
import { default_headers, post_request } from "@/lib/http-methods";

// Types
import { TSignInPayload } from "@/types";

const api_url = import.meta.env.VITE_API_URL || null;

export const sign_in = async (body: TSignInPayload) => {
  const response = await post_request(
    `${api_url}/auth/sign-in`,
    body,
    await default_headers()
  );

  return response;
};
