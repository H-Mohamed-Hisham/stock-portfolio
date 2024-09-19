import { Link } from "react-router-dom";

// Icons
import { Pencil } from "lucide-react";

// Components - Shadcn
import { Button } from "@/components/ui/button";

type Props = {
  link: string;
  disabled: boolean;
};

export const RowEditButton = ({ link, disabled }: Props) => {
  return (
    <>
      {disabled ? (
        <Button variant="secondary" disabled={disabled}>
          <Pencil className="h-4 w-4" />
        </Button>
      ) : (
        <Button asChild variant="secondary">
          <Link to={link}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </>
  );
};
