// Theme
import { ThemeProvider } from "@/provider/theme/theme-provider";

// Routes
import { AppRoutes } from "@/routes";

// // Shadcn
// import { Button } from "@/components/ui/button";

// // Component
// import { ThemeToggle } from "@/components/navbar/theme-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <Button>dsdsd</Button>
      <ThemeToggle /> */}
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
