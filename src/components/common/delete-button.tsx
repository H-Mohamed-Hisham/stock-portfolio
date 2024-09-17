import { Trash2 } from "lucide-react";

// Shadcn
import { Button } from "@/components/ui/button";

type Props = {
  onClick: () => void;
};

export function DeleteButton({ onClick }: Props) {
  return (
    <Button variant="destructive" onClick={() => onClick()}>
      <Trash2 className="h-4 w-4" />
      Delete selected records
    </Button>
  );
}
