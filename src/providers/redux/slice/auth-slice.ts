import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Types
import { TAuthState, TAccessToken } from "@/types";

const initialState: TAuthState = {
  user: null,
  access_token: null,
};

try {
  if (localStorage.getItem("stock-portfolio-token")) {
    const decodedToken: TAccessToken = jwtDecode(
      localStorage.getItem("stock-portfolio-token") || ""
    );

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("stock-portfolio-token");
    } else {
      initialState.user = {
        id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
      };
      initialState.access_token = localStorage.getItem("stock-portfolio-token");
    }
  } else {
    initialState.user = null;
    initialState.access_token = null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error: unknown) {
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
      localStorage.removeItem("stock-portfolio-token");
      state.user = null;
      state.access_token = null;
    },
  },
});

export const authState = (state: { auth: TAuthState }) => state.auth;
export const { setUser, setAccessToken, setSignOut } = authSlice.actions;

export default authSlice.reducer;
