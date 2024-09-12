// Types
import { TUser } from "@/types";

export type TSignIn = {
  email: string;
  password: string;
};

export type TAuthState = {
  user: TUser | null;
  access_token: string | null;
};

export type TAccessToken = {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
};

export type TSignInResponse = {
  access_token: string;
  user: TUser;
};
