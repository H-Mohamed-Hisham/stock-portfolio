import { Link } from "react-router-dom";

// Icons
import { Pencil } from "lucide-react";

// Components - Shadcn
import { Button } from "@/components/ui/button";

type Props = {
  link: string;
};

export const RowEditButton = ({ link }: Props) => {
  return (
    <Link to={link}>
      <Button variant="secondary" size="icon">
        <Pencil className="h-4 w-4" />
      </Button>
    </Link>
  );
};
