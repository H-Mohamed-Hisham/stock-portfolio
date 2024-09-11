// Types
import { TUser } from "@/types";

export type TAccessToken = {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
};

export type TAuthState = {
  user: TUser | null;
  access_token: string | null;
};
