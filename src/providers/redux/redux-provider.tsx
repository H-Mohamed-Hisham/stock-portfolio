import { Provider } from "react-redux";

// Store
import { store } from "@/providers/redux/store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
