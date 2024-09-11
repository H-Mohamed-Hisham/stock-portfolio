import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from "@/providers/redux/slice/auth-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
