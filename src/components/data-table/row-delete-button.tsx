import { Trash2 } from "lucide-react";

// Components - Shadcn
import { Button } from "@/components/ui/button";

type Props = {
  row_id: string;
  onClick: (row_id: string) => void;
};

export const RowDeleteButton = ({ row_id, onClick }: Props) => {
  return (
    <Button variant="destructive" size="icon" onClick={() => onClick(row_id)}>
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};
