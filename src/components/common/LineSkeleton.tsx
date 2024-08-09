// Components - Shadcn
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  line_count?: number;
};

export const LineSkeleton = ({ line_count = 1 }: Props) => {
  return (
    <div>
      {Array.from({ length: line_count }).map((_, index) => (
        <Skeleton key={index} className="h-8 w-full" />
      ))}
    </div>
  );
};
