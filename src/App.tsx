// Providers
import { ReduxProvider, ThemeProvider, ReactQueryProvider } from "@/providers";

// Routes
import { AppRoutes } from "@/routes";

function App() {
  return (
    <ReduxProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ReactQueryProvider>
          <AppRoutes />
        </ReactQueryProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
