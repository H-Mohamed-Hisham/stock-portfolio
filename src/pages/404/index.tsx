import { Link } from "react-router-dom";

// Components
import { PageLayout } from "@/components/layout";

// Shadcn
import { Button } from "@/components/ui/button";

export function PageNotFound() {
  return (
    <PageLayout>
      <div className="grid min-h-full place-items-cente px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-lg font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <Button asChild variant="default">
              <Link to="/">Go back home</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
