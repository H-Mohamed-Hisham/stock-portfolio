import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Constants
import { LOCAL_STORAGE_KEY } from "@/constants/miscellaneous";

// Types
import { TAuthState, TAccessToken } from "@/types";

const initialState: TAuthState = {
  user: null,
  access_token: null,
};

try {
  if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
    const decodedToken: TAccessToken = jwtDecode(
      localStorage.getItem(LOCAL_STORAGE_KEY) || ""
    );

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      initialState.user = {
        id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
      };
      initialState.access_token = localStorage.getItem(LOCAL_STORAGE_KEY);
    }
  } else {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    initialState.user = null;
    initialState.access_token = null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error: unknown) {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  initialState.user = null;
  initialState.access_token = null;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
    setSignOut: (state) => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      state.user = null;
      state.access_token = null;
    },
  },
});

export const authState = (state: { auth: TAuthState }) => state.auth;
export const { setUser, setAccessToken, setSignOut } = authSlice.actions;

export default authSlice.reducer;
