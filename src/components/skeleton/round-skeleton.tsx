// Shadcn
import { Skeleton } from "@/components/ui/skeleton";

export function RoundSkeleton() {
  return (
    <div className="flex justify-center items-center">
      <Skeleton className="h-40 w-40 rounded-full" />
    </div>
  );
}
