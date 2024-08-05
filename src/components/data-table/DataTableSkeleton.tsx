// Components - UI
import { Skeleton } from "@/components/ui/skeleton";

export const DataTableSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton key={index} className="h-8 w-full" />
      ))}
    </div>
  );
};
