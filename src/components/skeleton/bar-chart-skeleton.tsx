// Types
import { TSkeleton } from "@/types";

// Shadcn
import { Skeleton } from "@/components/ui/skeleton";

export function BarChartSkeleton({ count = 1 }: TSkeleton) {
  return (
    <div className="flex flex-col gap-y-1.5">
      <div className="flex flex-row grow-1 gap-x-1">
        {Array.from({ length: count }).map((_, index) => (
          <Skeleton key={index} className="h-32 w-full" />
        ))}
      </div>
      <Skeleton className="h-2 w-full" />
    </div>
  );
}
