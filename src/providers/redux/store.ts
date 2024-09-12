import { configureStore } from "@reduxjs/toolkit";

// Providers
import authReducer from "@/providers/redux/slice/auth-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
