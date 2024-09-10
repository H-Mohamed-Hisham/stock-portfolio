// Theme
import { ThemeProvider } from "@/provider/theme/theme-provider";

// Routes
import { AppRoutes } from "@/routes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
