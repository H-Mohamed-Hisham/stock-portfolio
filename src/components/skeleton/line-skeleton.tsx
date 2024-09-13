// Types
import { TSkeleton } from "@/types";

// Shadcn
import { Skeleton } from "@/components/ui/skeleton";

export function LineSkeleton({ count = 1 }: TSkeleton) {
  return (
    <div className="flex flex-col gap-y-1.5">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="h-8 w-full" />
      ))}
    </div>
  );
}
