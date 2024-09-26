// Icons
import { Search } from "lucide-react";

// Shadcn
import { Input } from "@/components/ui/input";

export function GlobalFilter({
  globalFilter,
  setGlobalFilter,
  placeholder,
}: {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}) {
  return (
    <div className="relative w-[230px]">
      <Search className="absolute top-3 left-2 w-4 h-4" />
      <Input
        placeholder={`Filter by ${placeholder}`}
        value={globalFilter || ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setGlobalFilter(event.target.value)
        }
        // className="max-w-sm pl-8"
        className="w-full pl-8"
      />
    </div>
  );
}
