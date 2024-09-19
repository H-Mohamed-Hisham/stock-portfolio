import { Trash2 } from "lucide-react";

// Components - Shadcn
import { Button } from "@/components/ui/button";

type Props = {
  row_id: string;
  onClick: (row_id: string) => void;
  disabled: boolean;
};

export const RowDeleteButton = ({ row_id, onClick, disabled }: Props) => {
  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={() => onClick(row_id)}
      disabled={disabled}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};
